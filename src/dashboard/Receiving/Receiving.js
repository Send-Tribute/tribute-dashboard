import React, { useContext, useState } from 'react';

import {
  Typography,
  TextField,
  Modal,
  Container,
  Divider,
  Paper,
  Button
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Context } from '../context';
import { Icon, SectionHeader, Scanner } from '../general';

const useStyles = createUseStyles({
  container: {
    paddingTop: 20
  },
  redeemButton: {
    right: 0,
    marginLeft: 20
  },
  contentContainer: {
    paddingTop: 10
  },
  baseCurrencyIcon: {
    top: 3,
    height: 20
  },
  divider: {
    marginTop: 20
  },
  unclaimedTributeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    padding: 20,
    borderRadius: 10
  },
  buttonIcon: {
    height: 25,
    paddingRight: 10
  }
});

const Receiving = () => {
  const [context] = useContext(Context);
  const classes = useStyles();
  const { userDetails } = context;
  const [values, setValues] = useState({
    address: '',
    externalUserInterest: '(scan to load)'
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setAddress = async address => {
    let trimmedAddress = await address;
    if (address.indexOf('ethereum:') > -1) {
      trimmedAddress = address.substr(9, address.length - 1);
    }
    if (trimmedAddress.length > 41) {
      const unclaimedTribute = await context.tribute.getUnclaimedAmount(
        trimmedAddress
      );
      setValues({
        ...values,
        externalUserInterest: unclaimedTribute,
        address: trimmedAddress
      });
      return;
    }
    setValues({
      ...values,
      address: trimmedAddress
    });
  };

  let selfTribute = '(enable wallet) ';
  let unclaimedTribute = '(enable wallet) ';
  if (userDetails) {
    selfTribute = Math.trunc(userDetails.unallocated_balance);
    unclaimedTribute = userDetails.unclaimed_balance;
  }

  const getSelfTribute = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Self Tribute" icon="cached" />
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              <b>{selfTribute}</b>{' '}
              <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />{' '}
              from your principal are generating interest for you.
            </Typography>
          </Paper>
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  // const getActiveInflows = () => {
  //   return (
  //     <Container className={classes.container}>
  //       <SectionHeader text="Active Tributes" icon="faucetOn" />
  //       <Container className={classes.contentContainer}>
  //         <CustomTable
  //           headings={['Sender', 'Tribute Amount']}
  //           rows={[[1, 2], [1, 2], [1, 2]]}
  //         />
  //
  //         <Divider className={classes.divider} />
  //       </Container>
  //     </Container>
  //   );
  // };
  //
  // const getInactiveInflows = () => {
  //   return (
  //     <Container className={classes.container}>
  //       <SectionHeader text="Inactive Tributes" icon="faucetOff" />
  //       <Container className={classes.contentContainer}>
  //         <CustomTable
  //           headings={['Sender', 'Tribute Amount']}
  //           rows={[[1, 2], [1, 2], [1, 2]]}
  //         />
  //       </Container>
  //     </Container>
  //   );
  // };

  const getClaimTribute = () => {
    return (
      <Container className={classes.container}>
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              Ready to claim: <b>{unclaimedTribute}</b>{' '}
              <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />
            </Typography>

            <div>
              <Button
                onClick={() => context.tribute.claimAmount(context.address[0])}
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#1b1c4c' }}
                className={classes.redeemButton}
              >
                <Icon name="receiveMoney" className={classes.buttonIcon} />
                Claim
              </Button>
            </div>
          </Paper>
        </Container>
      </Container>
    );
  };

  const getClaimOnBehalfOf = () => {
    return (
      <Container className={classes.container}>
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <div>
              <Typography variant="body1">Claim on behalf of:</Typography>
              <div style={{ display: 'flex' }}>
                <TextField
                  variant="outlined"
                  label="Address"
                  id="outlined-dense"
                  margin="dense"
                  value={values.address}
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  style={{ padding: '0 0 0 0', margin: '0 0 0 10px' }}
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <Icon name="qr" className={classes.buttonIcon} />
                </Button>
                <Modal
                  open={open}
                  style={{
                    paddingTop: '3rem'
                  }}
                >
                  <Scanner
                    handleClose={handleClose}
                    setAddress={setAddress}
                    onError={error => {
                      // eslint-disable-next-line no-console
                      console.log(error);
                    }}
                  />
                </Modal>
              </div>
              <div style={{ marginTop: 4 }}>
                <Typography variant="body1">
                  Ready to claim: <b>{values.externalUserInterest}</b>{' '}
                  <Icon
                    name="baseCurrency"
                    className={classes.baseCurrencyIcon}
                  />
                </Typography>
              </div>
            </div>

            <div>
              <Button
                onClick={() =>
                  context.tribute.claimTributeOnBehalfOf(values.address)
                }
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#1b1c4c' }}
                className={classes.redeemButton}
              >
                <Icon name="receiveMoney" className={classes.buttonIcon} />
                Claim
              </Button>
            </div>
          </Paper>
        </Container>
      </Container>
    );
  };

  return (
    <div>
      {getSelfTribute()}
      {getClaimTribute()}
      {getClaimOnBehalfOf()}
    </div>
  );
};

export default Receiving;

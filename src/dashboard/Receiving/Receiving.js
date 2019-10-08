import React, { useContext, useState } from 'react';
import { Context } from '../context';
import {
  Typography,
  TextField,
  Container,
  Divider,
  Paper,
  Button
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Icon, CustomTable, SectionHeader } from '../general';

const useStyles = createUseStyles({
  container: {
    paddingTop: 20
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
  redeemButton: {
    right: 0,
    marginLeft: 20
  },
  buttonIcon: {
    height: 25,
    paddingRight: 10
  }
});

const Receiving = () => {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();
  const { userDetails } = context;
  const [values, setValues] = useState({
    address: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  let selfTribute = '(enable wallet) ';
  let unclaimedTribute = '(enable wallet) ';
  if (userDetails) {
    selfTribute = Math.trunc(userDetails.unallocatedTribute);
    unclaimedTribute = userDetails.unclaimedTribute;
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

  const getActiveInflows = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Active Tributes" icon="faucetOn" />
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={['Sender', 'Tribute Amount']}
            rows={[[1, 2], [1, 2], [1, 2]]}
          />

          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getInactiveInflows = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Inactive Tributes" icon="faucetOff" />
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={['Sender', 'Tribute Amount']}
            rows={[[1, 2], [1, 2], [1, 2]]}
          />
        </Container>
      </Container>
    );
  };

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
                onClick={() => context.tribute.claimTribute()}
                variant="contained"
                color="primary"
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
            <div className={classes.leftContainer}>
              <Typography variant="body1">Claim on behalf of:</Typography>
              <TextField
                variant="outlined"
                label="Address"
                id="outlined-dense"
                margin="dense"
                value={values.address}
                onChange={handleChange('address')}
              />
            </div>
            <div>
              <Button
                onClick={() => context.tribute.claimTributeOnBehalfOf(address)}
                variant="contained"
                color="primary"
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

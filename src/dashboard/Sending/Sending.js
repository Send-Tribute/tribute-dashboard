import React, { useContext, useState } from 'react';
import {
  Container,
  Divider,
  Button,
  Grid,
  TextField,
  Modal,
  ModalContent
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Context } from '../context';
import {
  Icon,
  CustomTable,
  ProviderCard,
  SectionHeader,
  Scanner
} from '../general';
import { getEtherscanLink, getShortAddress } from '../helpers/utils';

import { DISCOVERABLE_PROVIDERS } from '../helpers/constants';

const useStyles = createUseStyles({
  container: {
    paddingTop: 20
  },
  contentContainer: {
    paddingTop: 10,
    justifyContent: 'center'
  },
  headerImage: {
    height: 40,
    margin: '0 22px 0 22px'
  },
  headerImageLarge: {
    height: 80,
    marginRight: 10
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center'
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
    display: 'flex',
    margin: 20,
    padding: 20,
    borderRadius: 10
  },
  redeemButton: {
    right: 0,
    marginLeft: 20
  },
  buttonIcon: {
    height: 25
  },
  addressInputContainer: {
    display: 'flex',
    margin: '10px 0 0px 0'
  },
  sendTributeButton: {
    margin: '10px 0 0 0'
  }
});

const endButton = (address, context) => {
  return (
    <Button
      style={{ backgroundColor: '#1b1c4c', color: 'white' }}
      variant="outlined"
      onClick={() => {
        context.tribute.endFlow(address);
      }}
    >
      end tribute
    </Button>
  );
};

const Sending = () => {
  const [context] = useContext(Context);
  const classes = useStyles();
  const [values, setValues] = useState({
    address: '',
    amount: ''
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setAddress = address => {
    setValues({ ...values, address: address });
  };

  const { userDetails } = context;

  let activeTributeRows = [['(enable wallet) ']];
  console.log(userDetails);
  if (userDetails && userDetails.allocations.recipients) {
    activeTributeRows = userDetails.allocations.recipients.map(
      (address, index) => {
        const amount = Math.round(
          userDetails.allocations.proportions[index]
        );
        return [getShortAddress(address), amount, endButton(address, context)];
      }
    );
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getActiveTributes = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Active Tributes" icon="waterwheel" />
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={['Recipient', 'Tribute Amount', 'Actions']}
            rows={activeTributeRows}
          />
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getInactiveTributes = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Inactive Tributes" icon="waterwheelOff" />
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={['Recipient', 'Tribute Amount', 'Actions']}
            rows={[[1, 2, 3], [1, 2, 3], [1, 2, 3]]}
          />
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getDiscoverTributes = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Discover" icon="tributeButton" />
        <Container className={classes.contentContainer}>
          <Grid container>
            {Object.keys(DISCOVERABLE_PROVIDERS).map(provider => {
              return (
                <Grid item key={provider}>
                  <ProviderCard provider={DISCOVERABLE_PROVIDERS[provider]} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  };

  const getSendTributes = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Send Tribute" icon="tributeButton" />
        <Container className={classes.contentContainer}>
          <div className={classes.addressInputContainer}>
            <TextField
              variant="outlined"
              label="Address"
              id="outlined-dense"
              margin="dense"
              value={values.address}
              onChange={handleChange('address')}
            />
            <Button
              variant="contained"
              style={{ padding: 0, margin: '0 0 0 10px' }}
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
                  this.changeAlert('danger', error);
                }}
              />
            </Modal>
          </div>
          <TextField
            variant="outlined"
            id="outlined-dense"
            margin="dense"
            label="Amount"
            value={values.amount}
            onChange={handleChange('amount')}
          />
          <br />
          <Button
            onClick={() =>
              context.tribute.sendTribute(values.address, values.amount)
            }
            size="large"
            type="submit"
            variant="outlined"
            color="primary"
            style={{ margin: '10px 0 0 0' }}
            className={classes.sendTributeButton}
          >
            <Icon name="logo" className={classes.buttonIcon} />
            Send Tribute
          </Button>
        </Container>
      </Container>
    );
  };

  return (
    <div>
      {getActiveTributes()}
      {getDiscoverTributes()}
      {getSendTributes()}
    </div>
  );
};

export default Sending;

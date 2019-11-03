import React, { useContext, useState } from 'react';
import {
  Container,
  Divider,
  Button,
  Grid,
  TextField,
  Modal
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Context } from '../context';
import {
  CustomTable,
  ProviderCard,
  SectionHeader,
  Scanner,
  Icon
} from '../general';

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

const endButton = (address, context) => (
  <Button
    style={{ backgroundColor: '#1b1c4c', color: 'white' }}
    variant="outlined"
    onClick={() => {
      context.tribute.endFlow(address);
    }}
  >
    End Tribute
  </Button>
);

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
    setValues({ ...values, address });
  };

  const { userDetails } = context;

  let activeTributeRows = [['(enable wallet) ']];
  // eslint-disable-next-line no-console
  console.log(userDetails);
  if (userDetails && userDetails.allocations.recipients) {
    activeTributeRows = userDetails.allocations.recipients.map(
      (address, index) => {
        let recipient = address;
        const amount = Math.round(userDetails.allocations.proportions[index]);
        // Check if the address is known and provide the name
        Object.keys(DISCOVERABLE_PROVIDERS).forEach(provider => {
          if (DISCOVERABLE_PROVIDERS[provider].address === address) {
            recipient = DISCOVERABLE_PROVIDERS[provider].name;
          }
        });
        return [recipient, amount, endButton(address, context)];
      }
    );
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getActiveTributes = () => (
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

  // const getInactiveTributes = () => (
  //   <Container className={classes.container}>
  //     <SectionHeader text="Inactive Tributes" icon="waterwheelOff" />
  //     <Container className={classes.contentContainer}>
  //       <CustomTable
  //         headings={['Recipient', 'Tribute Amount', 'Actions']}
  //         rows={[[1, 2, 3], [1, 2, 3], [1, 2, 3]]}
  //       />
  //       <Divider className={classes.divider} />
  //     </Container>
  //   </Container>
  // );

  const getDiscoverTributes = () => (
    <Container className={classes.container}>
      <SectionHeader text="Discover" icon="tributeButton" />
      <Container className={classes.contentContainer}>
        <Grid container>
          {Object.keys(DISCOVERABLE_PROVIDERS).map(provider => (
            <Grid item key={provider}>
              <ProviderCard provider={DISCOVERABLE_PROVIDERS[provider]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );

  const getSendTributes = () => (
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
                // eslint-disable-next-line no-console
                console.log(error);
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
            context.tribute.startFlow(values.address, values.amount)
          }
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: '10px 0 10px', backgroundColor: '#1b1c4c' }}
          className={classes.sendTributeButton}
        >
          Send Tribute
        </Button>
      </Container>
    </Container>
  );

  return (
    <div>
      {getActiveTributes()}
      {getDiscoverTributes()}
      {getSendTributes()}
    </div>
  );
};

export default Sending;

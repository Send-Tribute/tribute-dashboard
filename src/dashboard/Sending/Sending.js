import React, { useContext, useState } from 'react';
import { Container, Divider, Button, Grid, TextField } from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Context } from '../context';
import { Icon, CustomTable, ProviderCard, SectionHeader } from '../general';
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
    height: 25,
    paddingRight: 10
  },
  addressInputContainer: {
    display: 'flex',
    margin: '10px 0 15px 0'
  },
  sendTributeButton: {
    padding: 10
  }
});

const endButton = (address, context) => {
  return (
    <Button
      onClick={() => {
        context.tribute.endTribute(address);
      }}
      variant="text"
    >
      end
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

  const { userDetails } = context;

  let activeTributeRows = [['(enable wallet) ']];
  if (userDetails && userDetails.activeTributes.recipients) {
    activeTributeRows = userDetails.activeTributes.recipients.map(
      (address, index) => {
        const amount = Math.trunc(
          userDetails.activeTributes.tributeAmounts[index]
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

  const getSocialTributes = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Send Tribute" icon="tributeButton" />
        <Container className={classes.contentContainer}>
          <div className={classes.addressInputContainer}>
            <TextField
              variant="outlined"
              label="Address"
              value={values.address}
              onChange={handleChange('address')}
            />
            <Button variant="contained">
              <Icon name="qr" className={classes.buttonIcon} />
              Scan
            </Button>
          </div>
          <TextField
            variant="outlined"
            label="Amount"
            value={values.amount}
            onChange={handleChange('amount')}
          />
          <Button
            onClick={() =>
              context.tribute.sendTribute(values.address, values.amount)
            }
            size="large"
            type="submit"
            variant="outlined"
            color="primary"
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
      {getSocialTributes()}
    </div>
  );
};

export default Sending;

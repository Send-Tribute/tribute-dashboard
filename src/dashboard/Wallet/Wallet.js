import React, { useContext } from 'react';
import { Context } from '../context';
import {
  Grid,
  Typography,
  Container,
  Divider,
  Paper,
  Button
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Icon, CustomTable, SectionHeader } from '../general';
import { getEtherscanLink } from '../helpers/utils';

import { FIAT_GATEWAYS, CRYPTO_EXCHANGES } from '../helpers/general';

const useStyles = createUseStyles({
  container: {
    paddingTop: 20
  },
  contentContainer: {
    paddingTop: 10
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
  fiatButton: {
    textTransform: 'none',
    width: 200,
    margin: 10,
    borderRadius: 10
  },
  fiatButtonIcon: {
    height: 50,
    marginRight: 10
  },
  fiatGrid: {
    justifyContent: 'space-around'
  },
  walletGrid: {
    justifyContent: 'space-around'
  },
  exchangeButton: {
    margin: 15
  }
});

const Wallet = () => {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const redeemTribute = () => {};

  const getWallet = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="My Tribute Wallet" icon="wallet" />
        <Container className={classes.contentContainer}>
          <Grid container spacing={3} className={classes.walletGrid}>
            <Grid item>
              <CustomTable
                headings={['Principal', 'Tribute-Enabled']}
                rows={[[getEtherscanLink('1', 'kovan'), 2], [1, 2], [1, 2]]}
              />
            </Grid>
            <Grid item>
              <CustomTable
                headings={['Interest Source', 'Current APR']}
                rows={[[getEtherscanLink('1', 'kovan'), 2], [1, 2], [1, 2]]}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getExchanges = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Exchange Tribute" icon="convertDaiTribute" />
        <Container className={classes.contentContainer}>
          <Typography variant="body1">
            In order to send Tribute to recipients, you need to generate Tribute
            from DAI in your wallet. Your DAI never leaves your wallet, but it
            will generate interest that you can direct to others. More
            information is{' '}
            <a href="./" target="_blank">
              here
            </a>
            .
          </Typography>
          <Button
            className={classes.exchangeButton}
            variant="contained"
            color="primary"
          >
            Generate Tribute
          </Button>
          <Typography variant="body1">
            You can withdraw your DAI at any time.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.exchangeButton}
          >
            Withdraw DAI
          </Button>
        </Container>
      </Container>
    );
  };

  const getFiatGateways = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Purchase Tribute" icon="convertDollarTribute" />
        <Container className={classes.contentContainer}>
          <Grid container className={classes.fiatGrid}>
            {Object.keys(FIAT_GATEWAYS).map(gateway => {
              return (
                <Grid item key={FIAT_GATEWAYS[gateway].name}>
                  <Button
                    className={classes.fiatButton}
                    onClick={() =>
                      window.open(FIAT_GATEWAYS[gateway].website, '_blank')
                    }
                    variant="outlined"
                  >
                    <Icon
                      name={FIAT_GATEWAYS[gateway].image}
                      className={classes.fiatButtonIcon}
                    />{' '}
                    {FIAT_GATEWAYS[gateway].name}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  };

  return (
    <div>
      {getWallet()}
      {getExchanges()}
      {getFiatGateways()}
    </div>
  );
};

export default Wallet;
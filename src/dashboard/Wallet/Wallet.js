import React, { useContext, useState } from 'react';
import { Context } from '../context';
import {
  Grid,
  Typography,
  Container,
  Divider,
  TextField,
  Paper,
  Button
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { Icon, CustomTable, SectionHeader } from '../general';
import { getEtherscanLink } from '../helpers/utils';

import { FIAT_GATEWAYS, CRYPTO_EXCHANGES } from '../helpers/constants';

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
  }
});

const Wallet = () => {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();
  const { userDetails } = context;

  const [values, setValues] = useState({
    address: '',
    amount: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  let unallocatedTribute = '(enable wallet)';
  let tributeBalance = '(enable wallet)';
  if (userDetails) {
    unallocatedTribute = Math.trunc(userDetails.unallocatedTribute);
    tributeBalance = Math.trunc(userDetails.tributeBalance);
  }

  const getSimpleWallet = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="My Tribute Wallet" icon="wallet" />
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              You have <b>{tributeBalance}</b>{' '}
              <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />{' '}
              Tribute.
              <br />
              <b>{unallocatedTribute}</b>{' '}
              <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />{' '}
              is unallocated.
            </Typography>
          </Paper>
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };
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
            .<br />
          </Typography>
          <TextField
            variant="outlined"
            id="outlined-dense"
            margin="dense"
            label="Amount"
            value={values.amount}
            onChange={handleChange('amount')}
          />
          <Button
            style={{ margin: '10px 0 10px', backgroundColor: '#1b1c4c' }}
            variant="contained"
            color="primary"
            onClick={() => {
              context.tribute.generateTribute(values.amount);
            }}
          >
            Generate Tribute
          </Button>
          <Typography variant="body1">
            You can withdraw your DAI at any time.
          </Typography>
          <Button
            onClick={() => {
              context.tribute.disableTribute();
            }}
            variant="contained"
            color="primary"
            style={{ margin: '10px 0 10px', backgroundColor: '#1b1c4c' }}
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
                    style={{ margin: 10 }}
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
      {getSimpleWallet()}
      {getExchanges()}
      {getFiatGateways()}
    </div>
  );
};

export default Wallet;

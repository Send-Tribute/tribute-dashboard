import React, { useContext, useState } from 'react';
import {
  Typography,
  Container,
  Divider,
  TextField,
  Paper,
  Button
} from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from '../context';
import { Icon, SectionHeader } from '../general';

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
    top: 8,
    height: 25
  },
  divider: {
    marginTop: 20
  },
  unclaimedTributeContainer: {
    alignItems: 'center',
    display: 'flex',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between'
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
  floatRightButton: {
    right: 0,
    marginLeft: 20
  }
});

const Wallet = () => {
  const [context] = useContext(Context);
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
    unallocatedTribute = Math.trunc(userDetails.unallocated_balance);
    tributeBalance = Math.trunc(userDetails.balance);
  }

  const getSimpleWallet = () => (
    <Container className={classes.container}>
      <SectionHeader text="My Tribute Wallet" icon="wallet" />
      <Container className={classes.contentContainer}>
        <Paper elevation={5} className={classes.unclaimedTributeContainer}>
          <Typography variant="body1">
            You have generated a total of <b>{tributeBalance}</b>{' '}
            <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />{' '}
            Tribute.
            <br />
            <br />
            From that total, <b>{unallocatedTribute}</b>{' '}
            <Icon name="baseCurrency" className={classes.baseCurrencyIcon} />{' '}
            Tribute is unallocated.
          </Typography>
        </Paper>
        <Divider className={classes.divider} />
      </Container>
    </Container>
  );
  // const getWallet = () => (
  //   <Container className={classes.container}>
  //     <SectionHeader text="My Tribute Wallet" icon="wallet" />
  //     <Container className={classes.contentContainer}>
  //       <Grid container spacing={3} className={classes.walletGrid}>
  //         <Grid item>
  //           <CustomTable
  //             headings={['Principal', 'Tribute-Enabled']}
  //             rows={[[getEtherscanLink('1', 'kovan'), 2], [1, 2], [1, 2]]}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <CustomTable
  //             headings={['Interest Source', 'Current APR']}
  //             rows={[[getEtherscanLink('1', 'kovan'), 2], [1, 2], [1, 2]]}
  //           />
  //         </Grid>
  //       </Grid>
  //       <Divider className={classes.divider} />
  //     </Container>
  //   </Container>
  // );

  const getExchanges = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Enable Tribute" icon="convertDaiTribute" />
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              In order to send Tribute to recipients, you need to generate
              Tribute from DAI in your wallet.
              <br />
              <br />
              Your DAI never leaves your wallet, but it will generate interest
              that you can direct to others.
              <br />
              <br />
              More information is{' '}
              <a
                href="https://redeem.money/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
              <br />
              <br />1 DAI = 1 Tribute
            </Typography>
          </Paper>
          <Divider className={classes.divider} />
          <br />

          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <div>
              <Typography variant="body1">
                Choose how much Tribute to generate :
              </Typography>
              <TextField
                variant="outlined"
                id="outlined-dense"
                margin="dense"
                label="Amount"
                value={values.amount}
                onChange={handleChange('amount')}
              />
            </div>
            <div>
              <Button
                style={{ margin: '10px 0 10px', backgroundColor: '#1b1c4c' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  context.tribute.generate(values.amount);
                }}
              >
                Generate Tribute
              </Button>
            </div>
          </Paper>
          <Divider className={classes.divider} />
          <br />

          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              You can withdraw your DAI at any time.
            </Typography>

            <Button
              onClick={() => {
                context.tribute.disable();
              }}
              variant="contained"
              color="primary"
              style={{ margin: '10px 0 10px', backgroundColor: '#1b1c4c' }}
              className={classes.floatRightButton}
            >
              Withdraw DAI
            </Button>
          </Paper>
        </Container>
      </Container>
    );
  };

  const getFiatGateways = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Get Tribute" icon="convertDollarTribute" />
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <div style={{ wordWrap: 'break-word', width: '100%' }}>
              <Typography variant="body1">
                In order to use Tribute on the Kovan testnet, you will need some
                Kovan ETH and Kovan DAI.
                <br />
                <br /> You can obtain Kovan ETH from a faucet{' '}
                <a
                  href="https://faucet.kovan.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                . You will need to use your GitHub login. <br />
                <br />
                You can obtain Kovan DAI via the Compound faucet{' '}
                <a
                  href="https://app.compound.finance/asset/cDAI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                . You will need to first click “Enable DAI“ before accessing the
                DAI faucet. <br />
                <br />
                To see your DAI and rDAI balances in your wallet, add these two
                custom token addresses: <br />
                <br />
                <b>DAI (Kovan)</b>: 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99{' '}
                <br />
                <CopyToClipboard text="0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99">
                  <Button
                    style={{
                      margin: '10px 0 10px',
                      backgroundColor: '#1b1c4c'
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
                <br />
                <b>rDAI (Kovan)</b>: 0xeA718E4602125407fAfcb721b7D760aD9652dfe7
                <br />
                <CopyToClipboard text="0xeA718E4602125407fAfcb721b7D760aD9652dfe7">
                  <Button
                    style={{
                      margin: '10px 0 10px',
                      backgroundColor: '#1b1c4c'
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
              </Typography>
            </div>
          </Paper>
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

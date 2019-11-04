import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SectionHeader } from '../general';
import { getEtherscanLink } from '../helpers/utils';

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

export default function Settings() {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <SectionHeader text="Contracts (kovan)" icon="" />
        <Container className={classes.contentContainer}>
          <Typography variant="body1">
            rDAI:{' '}
            {getEtherscanLink(
              '0xea718e4602125407fafcb721b7d760ad9652dfe7',
              'kovan'
            )}{' '}
            <CopyToClipboard text="0xea718e4602125407fafcb721b7d760ad9652dfe7">
              <Button
                style={{
                  margin: '10px 0 10px',
                  backgroundColor: '#1b1c4c',
                  marginLeft: 10
                }}
                variant="contained"
                color="primary"
              >
                Copy
              </Button>
            </CopyToClipboard>
            <br />
            DAI:{' '}
            {getEtherscanLink(
              '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99',
              'kovan'
            )}
            <CopyToClipboard text="0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99">
              <Button
                style={{
                  margin: '10px 0 10px',
                  backgroundColor: '#1b1c4c',
                  marginLeft: 10
                }}
                variant="contained"
                color="primary"
              >
                Copy
              </Button>
            </CopyToClipboard>
            <br />
            cDAI:{' '}
            {getEtherscanLink(
              '0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496',
              'kovan'
            )}
            <CopyToClipboard text="0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496">
              <Button
                style={{
                  margin: '10px 0 10px',
                  backgroundColor: '#1b1c4c',
                  marginLeft: 10
                }}
                variant="contained"
                color="primary"
              >
                Copy
              </Button>
            </CopyToClipboard>
            <br />
            daiCompoundAllocationStrategy:{' '}
            {getEtherscanLink(
              '0xb4377efc05bd28be8e6510629538e54eba2d74e3',
              'kovan'
            )}
            <CopyToClipboard text="0xb4377efc05bd28be8e6510629538e54eba2d74e3">
              <Button
                style={{
                  margin: '10px 0 10px',
                  backgroundColor: '#1b1c4c',
                  marginLeft: 10
                }}
                variant="contained"
                color="primary"
              >
                Copy
              </Button>
            </CopyToClipboard>
          </Typography>
        </Container>
      </Container>
    </div>
  );
}

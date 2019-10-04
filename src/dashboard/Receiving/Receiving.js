import React, { useContext } from 'react';
import { Context } from '../context';
import {
  Typography,
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
  }
});

const Receiving = () => {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const getSelfTribute = () => {
    return (
      <Container className={classes.container}>
        <SectionHeader text="Self Tribute" icon="cached" />
        <Container className={classes.contentContainer}>
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              <b>450</b>{' '}
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
            headings={[
              'Sender',
              'Asset',
              'Current APR',
              'Tribute Amount',
              'Flowing Since',
              'Total Received'
            ]}
            rows={[[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]}
          />
          <Paper elevation={5} className={classes.unclaimedTributeContainer}>
            <Typography variant="body1">
              Ready to claim: <b>344</b>{' '}
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
            headings={[
              'Sender',
              'Asset',
              'Average APR',
              'Tribute Amount',
              'Tribute Length',
              'Total Received'
            ]}
            rows={[[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]}
          />
        </Container>
      </Container>
    );
  };

  return (
    <div>
      {getSelfTribute()}
      {getActiveInflows()}
      {getInactiveInflows()}
    </div>
  );
};

export default Receiving;

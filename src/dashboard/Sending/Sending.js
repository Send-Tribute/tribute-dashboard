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
import { Icon, CustomTable, ProviderCard } from '../general';
import { getEtherscanLink } from '../helpers/utils';

import { DISCOVERABLE_PROVIDERS } from '../helpers/constants';

const useStyles = createUseStyles({
  container: {
    paddingTop: 20
  },
  contentContainer: {
    paddingTop: 10
  },
  headerImage: {
    width: 30,
    paddingRight: 5
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
  }
});

const Sending = () => {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const redeemTribute = () => {};

  const getActiveTributes = () => {
    return (
      <Container className={classes.container}>
        <div className={classes.headerContainer}>
          <Icon name="waterwheel" className={classes.headerImage} />
          <Typography variant="h4">Active Tributes</Typography>
        </div>
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={[
              'Recipient',
              'Tribute Amount',
              'Current APR',
              'Flowing Since',
              'Total Sent',
              'Actions'
            ]}
            rows={[
              [getEtherscanLink('1', 'kovan'), 2, 3, 4, 5, 6],
              [1, 2, 3, 4, 5, 6],
              [1, 2, 3, 4, 5, 6]
            ]}
          />
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getInactiveTributes = () => {
    return (
      <Container className={classes.container}>
        <div className={classes.headerContainer}>
          <Icon name="waterwheelOff" className={classes.headerImage} />
          <Typography variant="h4">Inactive Tributes</Typography>
        </div>
        <Container className={classes.contentContainer}>
          <CustomTable
            headings={[
              'Recipient',
              'Tribute Amount',
              'Average APR',
              'Duration',
              'Total Sent',
              'Actions'
            ]}
            rows={[[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]}
          />
          <Divider className={classes.divider} />
        </Container>
      </Container>
    );
  };

  const getDiscoverTributes = () => {
    return (
      <Container className={classes.container}>
        <div className={classes.headerContainer}>
          <Icon name="tributeButton" className={classes.headerImage} />
          <Typography variant="h4">Discover</Typography>
        </div>
        <Grid container className={classes.contentContainer}>
          {Object.keys(DISCOVERABLE_PROVIDERS).map(provider => {
            return (
              <Grid item key={provider}>
                <ProviderCard provider={DISCOVERABLE_PROVIDERS[provider]} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  };

  return (
    <div>
      {getActiveTributes()}
      {getInactiveTributes()}
      {getDiscoverTributes()}
    </div>
  );
};

export default Sending;

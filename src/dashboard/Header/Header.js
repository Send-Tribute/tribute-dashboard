import React, { useContext } from 'react';
import { Context } from '../context';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import TabsMenu from './TabsMenu/';
import EnableWeb3Button from './EnableWeb3Button/';
import tribute_logo from '../assets/tribute-logo.png';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    flexGrow: 1
  },

  title: {},
  logo: {
    padding: 8,
    height: 30
  },
  web3Button: {}
});

export default function Header() {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const getUserDetails = () => {
    let details = <EnableWeb3Button className={classes.web3Button} />;
    // if (context.userDetails) {
    //  TODO: return userDetails
    // }
    return details;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={tribute_logo} className={classes.logo} />
          {getUserDetails()}
        </Toolbar>
        <TabsMenu />
      </AppBar>
    </div>
  );
}

import React, { useContext } from 'react';
import { Context } from '../context';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import TabsMenu from './TabsMenu/';
import EnableWeb3Button from './EnableWeb3Button/';
import tribute_logo from '../assets/tribute-logo.png';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    flexGrow: 1,
    position: 'relative'
  },

  title: {},
  logo: {
    height: 60,
    marginTop: 25
  },
  web3Button: {
    position: 'absolute',
    right: 10,
    top: 30
  }
});

export default function Header() {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const getUserDetails = () => {
    let details = (
      <div style={{ position: 'absolute', right: 10, top: 10 }}>
        <EnableWeb3Button className={classes.web3Button} />
      </div>
    );
    // if (context.userDetails) {
    //  TODO: return userDetails
    // }
    return details;
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: '#1b1c4c' }}
        className={classes.appBar}
      >
        <Toolbar>
          <img src={tribute_logo} className={classes.logo} />
          {getUserDetails()}
        </Toolbar>
        <TabsMenu />
      </AppBar>
    </div>
  );
}

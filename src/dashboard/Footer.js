import React from 'react';
import { createUseStyles } from 'react-jss';
import { Typography } from '@material-ui/core';

const useStyles = createUseStyles({
  footer: {
    marginTop: 30,
    height: 40,
    color: '#FAFAFA',
    backgroundColor: '#1b1c4c',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    color: '#FAFAFA',
    marginRight: 10
  },
  iconContainer: {
    marginTop: 10
  }
});

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography style={{ margin: '5px 15px 0 0' }}>
        <a
          style={{ color: '#FAFAFA' }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://sendtribute.io"
        >
          SendTribute.io
        </a>
      </Typography>
      <div className={classes.iconContainer}>
        <a
          className={classes.icon}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Send-Tribute"
        >
          <i className="fab fa-github" />
        </a>
        <a
          className={classes.icon}
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/send_tribute"
        >
          <i className="fab fa-twitter" />
        </a>
        <a
          className={classes.icon}
          target="_blank"
          rel="noopener noreferrer"
          href="https://tributeforum.io"
        >
          <i className="fab fa-discourse" />
        </a>
      </div>
    </div>
  );
}

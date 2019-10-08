import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  footer: {
    marginTop: 20,
    height: 50,
    color: '#FAFAFA',
    backgroundColor: '#1b1c4c',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    color: '#FAFAFA',
    marginRight: 10,
    marginTop: 10
  }
});

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <a className={classes.icon} target="_blank" href="https://sendtribute.io">
        SendTribute.io
      </a>
      <div className="icons-social" className={classes.icon}>
        <a
          className={classes.icon}
          target="_blank"
          href="https://github.com/Send-Tribute"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          className={classes.icon}
          target="_blank"
          href="https://twitter.com/send_tribute"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          className={classes.icon}
          target="_blank"
          href="https://tributeforum.io"
        >
          <i className="fab fa-discourse"></i>
        </a>
      </div>
    </div>
  );
}

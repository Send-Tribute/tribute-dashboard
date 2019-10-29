import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Icon from '../Icon';

const useStyles = createUseStyles({
  container: {
    height: 40,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    height: 30
  },
  imageContainer: {
    width: 30,
    marginRight: 10
  }
});

const SectionHeader = ({ text, icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <Icon name={icon} className={classes.image} />
      </div>
      <Typography variant="h5">{text}</Typography>
    </div>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SectionHeader;

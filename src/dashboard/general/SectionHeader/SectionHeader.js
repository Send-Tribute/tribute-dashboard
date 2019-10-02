import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    height: 80,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    height: 80,
    marginRight: 25
  },
  imageContainer: {
    width: 80,
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
      <Typography variant="h4">{text}</Typography>
    </div>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SectionHeader;

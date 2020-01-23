import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Icon from '../Icon';

const useStyles = createUseStyles({
  card: {
    maxWidth: 250,
    margin: 10,
    justifyContent: 'center'
  },
  media: {
    height: 160,
    justifyContent: 'center'
  },
  image: {
    height: 160,
    width: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  chipContainer: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 3
  },
  addressButton: {
    textTransform: 'none'
  },
  address: {
    marginTop: 10,
    paddingTop: 10,
    overflowWrap: 'break-word'
  },
  description: {
    height: 50
  }
});

const ProviderCard = ({ provider }) => {
  const classes = useStyles();
  const { name, address, website, tags, description, image } = provider;
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={name}>
        <Icon name={image} className={classes.image} />
      </CardMedia>
      <CardContent style={{ justifyContent: 'center' }}>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <div className={classes.description}>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </div>
        <div className={classes.chipContainer}>
          {tags.map(tag => (
            <Chip key={tag} label={tag} className={classes.chip} />
          ))}
        </div>
        <div className={classes.address}>
          <Typography variant="caption">{address}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(website, '_blank');
          }}
        >
          Website
        </Button>
        <Button
          className={classes.addressButton}
          size="small"
          color="primary"
          onClick={() => {
            window.open(`https://etherscan.io/address/${address}`, '_blank');
          }}
        >
          Etherscan
        </Button>
      </CardActions>
    </Card>
  );
};

ProviderCard.propTypes = {
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default ProviderCard;

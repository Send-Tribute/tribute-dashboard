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
import { getShortAddress } from '../../helpers/utils';

const useStyles = createUseStyles({
  card: {
    maxWidth: 345,
    margin: 10,
    justifyContent: 'center'
  },
  media: {
    height: 160,
    overflow: 'hidden'
  },
  image: { width: '100%', height: '100%' },
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
    marginTop: 10
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
        <div className={classes.address} style={{ paddingTop: 10 }}>
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
          Visit
        </Button>
        <Button
          className={classes.addressButton}
          size="small"
          color="primary"
          onClick={() => {
            window.open(
              `https://kovan.etherscan.io/address/${address}`,
              '_blank'
            );
          }}
        >
          {getShortAddress(address)}
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

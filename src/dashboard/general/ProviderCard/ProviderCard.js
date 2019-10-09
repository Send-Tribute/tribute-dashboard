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
import Icon from '../Icon';
import { createUseStyles } from 'react-jss';
import { getShortAddress } from '../../helpers/utils';
const useStyles = createUseStyles({
  card: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 160,
    overflow: 'hidden'
  },
  image: { width: '100%' },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 3
  },
  addressButton: {
    textTransform: 'none'
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
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <div className={classes.chipContainer}>
          {tags.map(tag => (
            <Chip key={tag} label={tag} className={classes.chip} />
          ))}
        </div>
        <Typography variant="caption">{address}</Typography>
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

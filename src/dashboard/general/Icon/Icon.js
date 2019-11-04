import React from 'react';
import PropTypes from 'prop-types';

import ICONS from '../../helpers/icons';

const Icon = ({ name, className }) => {
  if (ICONS[name] !== undefined) {
    if (ICONS[name].type === 'image') {
      return <img alt={name} className={className} src={ICONS[name].src} />;
    }
    if (ICONS[name].type === 'muiIcon') {
      return <div className={className}>{ICONS[name].component}</div>;
    }
  }
  return <img alt={name} src={ICONS.logo.src} className={className} />;
};

Icon.defaultProps = {
  className: ''
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
export default Icon;

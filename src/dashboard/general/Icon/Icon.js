import React from 'react';

import { ICONS } from '../../helpers/icons';

const Icon = ({ name, className }) => {
  if (ICONS[name] !== undefined) {
    if (ICONS[name].type === 'image') {
      return <img className={className} src={ICONS[name].src} />;
    }
    if (ICONS[name].type === 'muiIcon') {
      return <div className={className}>{ICONS[name].component}</div>;
    }
  }
  return <img src={ICONS.logo.src} className={className} />;
};

export default Icon;

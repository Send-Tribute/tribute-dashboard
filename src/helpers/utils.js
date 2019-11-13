import React from 'react';
import { NETWORKS } from './constants';

export const getShortAddress = address => {
  const len = address.length;
  const start = address.slice(0, 5);
  const end = address.slice(len - 5, len);
  return `${start}...${end}`;
};

export const getEtherscanLink = (address, network) => {
  return (
    <a
      href={`${NETWORKS[network].etherscan}${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {address}
    </a>
  );
};

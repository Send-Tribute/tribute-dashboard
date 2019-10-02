import React, { useContext } from 'react';
import { Context } from '../../context';
import { TABS } from '../../helpers/general';
import { Button } from '@material-ui/core';

export default function EnableWeb3Button() {
  const [context, setContext] = useContext(Context);

  //TODO: request user to unlock wallet. Thoughts on using Block Native?

  return (
    <Button variant="contained" color="secondary">
      Enable Wallet
    </Button>
  );
}

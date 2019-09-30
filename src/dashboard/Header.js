import './css/outline.css';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from './context';

export default function Header() {

  const [context] = useContext(Context);

  const [accountAddress, setAccountAddress] = useState("nothing");
  useEffect(() => {
    let currentContext = context;
    if(currentContext.controllers) {
      console.log(currentContext.controllers.HeaderController.testing);
      //console.log(currentContext.controllers.HeaderController.test());
      setAccountAddress(currentContext.controllers.HeaderController.testing)
    }
  }, [context])

  return (
    <div>
      HEADER
      <br/>
      <img src={ null }/>
      Account: { accountAddress }
      <img src={ null }/>
      <br/>
      Available Amt: { null }
      <br/>
      Wallet
      Sending
      Receiving
      Settings
    </div>
  );
}

import React from 'react';
import './css/outline.css';

export default function Header(props) {
  return (
    <div>
      HEADER
      <br/>
      <img src={ props.tribute_icon }/>
      Account: { props.account_address }
      <img src={ props.wallet_icon }/>
      <br/>
      Available Amt: { props.account_available_amt }
      <br/>
      Wallet
      Sending
      Receiving
      Settings
    </div>
  );
}

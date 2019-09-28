import React from 'react';
import './css/outline.css';

export default function Header(props) {
  return (
    <div>
      <img src={ props.tribute_icon }/>
      { props.account_address }
      <img src={ props.wallet_icon }/>
      { props.account_available_amt }
      HEADER
    </div>
  );
}

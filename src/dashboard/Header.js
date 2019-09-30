import React, { useContext } from 'react';
import { Context } from './context';
// import './css/outline.css';
import { TABS } from './helpers/general';

export default function Header(props) {
  const [context, setContext] = useContext(Context);

  const selectTab = tab => {
    setContext({ selectedTab: tab });
  };

  const getTabButtons = () => {
    return TABS.ordering.map(tab => {
      return <button onClick={() => selectTab(tab)}>{tab}</button>;
    });
  };

  return (
    <div>
      HEADER
      <br />
      <img src={props.tribute_icon} />
      Account: {props.account_address}
      <img src={props.wallet_icon} />
      <br />
      Available Amt: {props.account_available_amt}
      <br />
      {getTabButtons()}
    </div>
  );
}

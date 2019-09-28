import React from 'react';
import Display from './Display.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Table from './Table.js';
import Sending from './sending/Sending.js';
import Wallet from './wallet/Wallet.js';
import Receiving from './receiving/Receiving.js';
import Settings from './settings/Settings.js';
import './css/outline.css';

export default function Dashbaord() {
  return (
    <div>
      DASHBOARD
      <Header/>
      <Display>
        <Wallet>
          <Table/>
        </Wallet>
        <Sending>
          <Table/>
        </Sending>
        <Receiving>
          <Table/>
        </Receiving>
        <Settings>
          <Table/>
        </Settings>
      </Display>
      <Footer/>
    </div>
  );
}

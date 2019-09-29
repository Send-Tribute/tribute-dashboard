import React, { useState } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import Table from './Table.js';
import Sending from './sending/Sending.js';
import Wallet from './wallet/Wallet.js';
import Receiving from './receiving/Receiving.js';
import Settings from './settings/Settings.js';
import './css/outline.css';

export default function Dashbaord() {

  let [selectedTab, setSelectedTab] = useState();

  //use state, context or redux. We plan on using state since it's not necessary to use context

  //function here that renders Wallet, Sending, Receiving, and Settings based on state
  //pass the setSelectedTab Header
  //
  //the problem is that all the data between the views is different. How do we obtain that data and pass it
  //in a generalized way?
  //
  //Proposals:
  //We can use controllers that will fetch and then we can passed the returned data
  //based upon state call the correct controller to get the correct data
  //there will be 4 different controllers

  return (
    <div>
      DASHBOARD
      <Header/>
      { /* controller call would go here */ }
      <Footer/>
    </div>
  );
}

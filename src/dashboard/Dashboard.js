import React from 'react';
import Display from './Display.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Table from './Table.js';
import './css/outline.css';

export default function Dashbaord() {
  return (
    <div>
      DASHBOARD
      <Header/>
      <Display/>
      <Footer/>
    </div>
  );
}

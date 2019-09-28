import React from 'react';
import './css/outline.css';

export default function Display(props) {
  // Wallet View Injected
  // Sending View Injected
  // Receiving View Injected
  // Settings View Injected
  // based upon the state selected a different view will load
  return (
    <div>
      DISPLAY
      { props.children }
    </div>
  );
}

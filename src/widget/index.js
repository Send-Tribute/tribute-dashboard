import React from 'react';
import ReactDOM from 'react-dom';

const View = () => (
  <div>
    <h1>Widget</h1>
  </div>
);

const App = document.getElementById('app');

ReactDOM.render(<View />, App);

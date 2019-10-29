import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context';
import Dashboard from './Dashboard';

ReactDOM.render(
  <Provider>
    <Dashboard />
  </Provider>,
  document.getElementById('app')
);

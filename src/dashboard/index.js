import React, { useContext } from 'react';
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";

//Create Default Values for Context and set Injection Bindings
let Context = createContext({
  tribute: null,
  isConnected: false //this is in reference to Tribute
  // set injection Views
  // set injection Controllers
});
const Provider = Context.Provider;

let App = document.getElementById('app');
ReactDOM.render(
  <Provider>
    <Dashboard/>
  </Provider>,
  App
);

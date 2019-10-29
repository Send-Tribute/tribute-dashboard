import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({}); // this overrides context state
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};
Provider.propTypes = {
  children: PropTypes.node.isRequired
};
export { Context, Provider };

/*
 * https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
 */

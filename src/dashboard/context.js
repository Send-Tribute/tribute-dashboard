import React, { useState, createContext } from 'react';

const Context = createContext();

const Provider = (props) => {
  const [state, setState] = useState({}); //this overrides context state
  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };

/*
 * https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
 */

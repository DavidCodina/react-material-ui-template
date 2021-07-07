import React, { createContext } from 'react';


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


export const Provider = (props) => {
  return (
    <Context.Provider value={{}}>
      { props.children }
    </Context.Provider>
  );
};



// Import Pages
import React, { useState, useEffect } from 'react';

// Import components
import AppContext from "./AppContext";

const AppProvider = (props) => {
  const [store, setStore] = useState({
    userName: '',
    token: '',
    activeMenu: {},
    sidebarActive: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    setStore({ ...store, token, userName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={[store, setStore]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

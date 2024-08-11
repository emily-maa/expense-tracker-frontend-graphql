import React from 'react';
import { createContext, useState, useContext } from 'react';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider};
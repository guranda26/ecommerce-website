import React, { createContext, useState, ReactNode } from 'react';
import { clientMaker } from '../../sdk/createClient';

const apiRoot = clientMaker();

type UserContextType = {
  apiRoot: typeof apiRoot;
  setApiRoot: (newApiRoot: typeof apiRoot) => void;
};

const UserContext = createContext<UserContextType>({
  apiRoot,
  setApiRoot: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [apiRoot, setApiRoot] = useState(clientMaker());

  return (
    <UserContext.Provider value={{ apiRoot, setApiRoot }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

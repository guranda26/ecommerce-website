import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { clientMaker } from '../../sdk/createClient';
import { getMyCart } from '../../sdk/basketApi';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Cart } from '@commercetools/platform-sdk';

type UserContextType = {
  apiRoot: ByProjectKeyRequestBuilder | null;
  setApiRoot: (newApiRoot: ByProjectKeyRequestBuilder) => void;
  cart: Cart | null;
  setCart: (newCart: Cart) => void;
};

const UserContext = createContext<UserContextType>({
  apiRoot: null,
  setApiRoot: () => {},
  cart: null,
  setCart: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const initialValue = clientMaker();

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [apiRoot, setApiRoot] = useState(initialValue);
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchData = useCallback(async () => {
    await apiRoot.get().execute();
    const myCart = await getMyCart(apiRoot);
    if (myCart) setCart(myCart);
  }, [apiRoot]);

  useEffect(() => {
    void fetchData();
  }, [fetchData, apiRoot]);

  if (apiRoot && cart)
    return (
      <UserContext.Provider value={{ apiRoot, setApiRoot, cart, setCart }}>
        {children}
      </UserContext.Provider>
    );
};

export { UserContext, UserProvider };

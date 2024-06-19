import React, { useContext, useEffect, useState } from 'react';
import './basket.css';

import { UserContext } from '../../context/userContext';
import CircularProgress from '@mui/material/CircularProgress';
import { clearBasket } from '../../../sdk/basketApi';
import { CartItem } from '../../Interfaces/cartsInterface';

function ClearBasketButton(props: {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}): React.JSX.Element {
  const { apiRoot, cart, setCart } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { setCartItems } = props;

  const handleClearBasket = () => {
    if (apiRoot && cart) {
      void (async () => {
        setLoading(true);
        const newCart = await clearBasket(apiRoot, cart);
        if (!newCart) setErrorMessage(true);
        if (newCart) {
          setCart(newCart);
          setCartItems([]);
        }
        setLoading(false);
      })();
    }
  };

  useEffect(() => {
    if (errorMessage === true) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
    }
  }, [errorMessage]);

  return (
    <div className="clear-basket">
      {loading ? (
        <CircularProgress className="progress" disableShrink />
      ) : errorMessage ? (
        <p className="basket-error">There are some error</p>
      ) : (
        <button className="button" onClick={handleClearBasket}>
          Clear Basket
        </button>
      )}
    </div>
  );
}

export default ClearBasketButton;

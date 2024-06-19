import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useContext, useEffect, useState } from 'react';
import './basket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsCartCheckFill } from 'react-icons/bs';

import {
  addProductToCart,
  deleteProductInCart,
  isExistProductMyCart,
} from '../../../sdk/basketApi';
import { UserContext } from '../../../src/context/userContext';
import CircularProgress from '@mui/material/CircularProgress';
function BasketButton(props: {
  product: ProductProjection;
}): React.JSX.Element {
  const { apiRoot, cart, setCart } = useContext(UserContext);
  const [number, setNumber] = useState(1);
  const { product } = props;
  const [isDisabled, setDisabled] = useState(
    cart ? isExistProductMyCart(product.id, cart) : true
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleBasket = async (product: ProductProjection) => {
    setLoading(true);
    const response = await addProductToCart(product, number, cart!, apiRoot!);
    if (response?.statusCode === 200) {
      setDisabled(true);
      setCart(response.body);
    } else {
      setErrorMessage(true);
    }
    setLoading(false);
  };

  const deleteProduct = (product: ProductProjection) => {
    if (cart && apiRoot) {
      void (async () => {
        setLoading(true);
        const response = await deleteProductInCart(product, cart, apiRoot);
        if (response?.statusCode === 200) {
          setDisabled(false);
          setCart(response.body);
        } else {
          setErrorMessage(true);
        }
        setLoading(false);
      })();
    }
  };

  useEffect(() => {
    if (errorMessage === true) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 500);
    }
  }, [errorMessage]);

  return (
    <>
      {loading ? (
        <CircularProgress className="progress" disableShrink />
      ) : errorMessage ? (
        <p className="basket-error">There are some error</p>
      ) : (
        <div className="basket">
          {product.masterVariant.availability?.availableQuantity &&
          !isDisabled ? (
            <div className="basket-wrap">
              <div className="num-wrap">
                <button
                  className="num-btn"
                  title={`Remove one pcs ${product.name['en-US']}`}
                  onClick={() =>
                    setNumber((prev) => {
                      if (prev > 1) return prev - 1;
                      return prev;
                    })
                  }
                >
                  {<FontAwesomeIcon className="num-image" icon={faMinus} />}
                </button>
                <p className="num">{number}</p>
                <button
                  className="num-btn"
                  title={`Add one pcs ${product.name['en-US']}`}
                  onClick={() =>
                    setNumber((prev) => {
                      if (
                        product.masterVariant?.availability
                          ?.availableQuantity &&
                        prev <
                          product.masterVariant?.availability?.availableQuantity
                      )
                        return prev + 1;
                      return prev;
                    })
                  }
                >
                  {<FontAwesomeIcon className="num-image" icon={faPlus} />}
                </button>
              </div>
              <button
                className="basket-btn"
                title={`Add ${number} pcs ${product.name['en-US']} to basket`}
                onClick={() => void handleBasket(product)}
              >
                <FontAwesomeIcon className="basket-image" icon={faCartPlus} />
              </button>
            </div>
          ) : !product.masterVariant.availability?.availableQuantity ? (
            <button
              className="basket-btn disabled"
              title={`Cannot add ${product.name['en-US']} to basket`}
            >
              <BsCartCheckFill className="basket-image" />
            </button>
          ) : (
            <button
              className="basket-btn disabled"
              title={`Remove ${product.name['en-US']} from basket`}
              onClick={() => deleteProduct(product)}
            >
              <BsCartCheckFill className="basket-image" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default BasketButton;

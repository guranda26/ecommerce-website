import shoppingCart from '../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Basket.css';
import { routes } from '../../modules/routes';

import React, { useContext, useEffect, useState } from 'react';
import {
  applyPromoCodeToCart,
  getMyCart,
  removeProductFromCart,
  updateProductQuantity,
} from '../../../sdk/basketApi';
import { formatCartItem } from './utils/formatCartItem';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartItem } from '../../Interfaces/cartsInterface';
import { UserContext } from '../../context/userContext';
import CircularProgress from '@mui/material/CircularProgress';

const BasketPage: React.FC = () => {
  const { apiRoot, cart, setCart } = useContext(UserContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState<boolean>(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (apiRoot) {
          const myCart = await getMyCart(apiRoot);
          if (!myCart) {
            setCartItems([]);
            setLoading(false);
            return;
          }
          setCart(myCart);
          const items = myCart.lineItems.map(formatCartItem);
          setCartItems(items);
          setTotalCost(myCart.totalPrice.centAmount / 100);
        }
      } catch (err) {
        console.error('Error loading cart items:', (err as Error)?.message);
        setError('Failed to fetch cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    void loadCart();
  }, [apiRoot, setCart]);

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.totalPrice;
      });
      setTotalCost(total);
    };
    calculateTotalCost();
  }, [cartItems]);

  const handleRemoveFromCart = async (lineItemId: string) => {
    if (!apiRoot || !cart) {
      setError('No apiRoot or cart found.');
      return;
    }

    try {
      const success = await removeProductFromCart(
        apiRoot,
        cart.id,
        cart.version,
        lineItemId
      );
      if (success) {
        const updatedCart = await getMyCart(apiRoot);
        if (updatedCart) {
          setCart(updatedCart);
          const updatedItems = updatedCart.lineItems.map(formatCartItem);
          setCartItems(updatedItems);
          setTotalCost(updatedCart.totalPrice.centAmount / 100); // Update total cost
        }
      } else {
        setError('Failed to remove item from cart.');
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart.');
    }
  };

  const handleQuantityChange = async (
    lineItemId: string,
    newQuantity: number
  ) => {
    if (!apiRoot || !cart) {
      setError('No apiRoot or cart found.');
      return;
    }

    try {
      const updatedCart = await updateProductQuantity(
        apiRoot,
        cart.id,
        cart.version,
        lineItemId,
        newQuantity
      );
      if (updatedCart) {
        setCart(updatedCart);
        const updatedItems = updatedCart.lineItems.map(formatCartItem);
        setCartItems(updatedItems);
        setTotalCost(updatedCart.totalPrice.centAmount / 100); // Update total cost
      } else {
        setError('Failed to update item quantity.');
      }
    } catch (err) {
      console.error('Error updating item quantity:', err);
      setError('Failed to update item quantity.');
    }
  };

  const handleIncreaseQuantity = (
    lineItemId: string,
    currentQuantity: number
  ) => {
    void handleQuantityChange(lineItemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (
    lineItemId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      void handleQuantityChange(lineItemId, currentQuantity - 1);
    }
  };

  const handleApplyPromoCode = async () => {
    if (!apiRoot || !cart) {
      setPromoCodeError('No apiRoot or cart found.');
      return;
    }

    try {
      const updatedCart = await applyPromoCodeToCart(
        apiRoot,
        cart.id,
        cart.version,
        promoCode
      );
      if (updatedCart) {
        setCart(updatedCart);
        const updatedItems = updatedCart.lineItems.map(formatCartItem);
        setCartItems(updatedItems);
        setTotalCost(updatedCart.totalPrice.centAmount / 100);
        setPromoCodeApplied(true);
        setPromoCodeError(null);
      } else {
        setPromoCodeError(
          'Not valid promo code (For reviewers: please enter BOGO)'
        );
      }
    } catch (err) {
      console.error('Error applying promo code:', err);
      setPromoCodeError('Failed to apply promo code.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (cartItems.length === 0) {
    return (
      <section className="shopping-cart">
        <div className="shopping-cart__items">
          <img src={shoppingCart} alt="shopping cart" className="basket-img" />
          <div className="text-content">
            <h3 className="empty-cart">Your cart is empty</h3>
            <p className="empty-cart empty-cart-msg">
              <Link to={routes.catalog} className="cart-link">
                Discover
              </Link>{' '}
              what you really want
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="shopping-cart items">
      <h2 className="shopping-heading">Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <button
                onClick={() => void handleRemoveFromCart(item.lineItemId)}
                className="remove-cart"
              >
                Remove from Cart
              </button>
              <h3 className="item-heading">{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className="quantity-control num-wrap">
                <button
                  onClick={() =>
                    handleDecreaseQuantity(item.lineItemId, item.quantity)
                  }
                  className="num-btn"
                >
                  <FontAwesomeIcon className="basket-image" icon={faMinus} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleIncreaseQuantity(item.lineItemId, item.quantity)
                  }
                  className="num-btn"
                >
                  <FontAwesomeIcon className="basket-image" icon={faPlus} />
                </button>
              </div>
              <p className="total-price">
                Total: ${item.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        {!promoCodeApplied && (
          <div className="apply-promo-code">
            <input
              type="text"
              placeholder="Enter promo code"
              className="promo-input"
              value={promoCode}
              onChange={handleInputChange}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                void handleApplyPromoCode();
              }}
              className="remove-cart apply-promo-code"
            >
              Apply
            </button>
            {promoCodeError && (
              <p className="promo-code-error">
                <span className="error-icon">⚠️</span> {error}
                {promoCodeError}
              </p>
            )}
          </div>
        )}
        <div className="total-cost">
          <h3>Total:</h3>
          {!promoCodeApplied ? (
            <span>${totalCost.toFixed(2)}</span>
          ) : (
            <>
              <span className="original-cost">${totalCost.toFixed(2)}</span>
              <span className="discounted-cost">
                $
                {cart?.totalPrice?.centAmount
                  ? cart.totalPrice.centAmount / 100
                  : '0.00'}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BasketPage;

import shoppingCart from '../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Basket.css';
import { routes } from '../../modules/routes';

import React, { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import {
  getMyCart,
  getCart,
  removeProductFromCart,
  deleteProductInCart,
  updateProductQuantity,
} from '../../../sdk/basketApi';
import { formatCartItem } from './utils/formatCartItem';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartItem } from '../../Interfaces/cartsInterface';

const BasketPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cart = getMyCart();
        if (!cart) {
          setCartItems([]);
          return;
        }

        const items = await getCart(cart.id);
        if (!items || items.length === 0) {
          setCartItems([]);
          return;
        }

        const formattedItems = items.map(formatCartItem);
        setCartItems(formattedItems);
      } catch (err) {
        console.error('Error loading cart items:', (err as Error)?.message);
        setError('Failed to fetch cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    void loadCartItems();
  }, []);

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
    try {
      const cart: Cart | null = getMyCart();
      if (!cart) {
        setError('No cart found in local storage.');
        return;
      }
      const success = await removeProductFromCart(
        cart.id,
        cart.version,
        lineItemId
      );
      if (success) {
        setCartItems(
          cartItems.filter((item) => item.lineItemId !== lineItemId)
        );
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
    try {
      const cart: Cart | null = getMyCart();
      if (!cart) {
        setError('No cart found in local storage.');
        return;
      }
      const updatedCart = await updateProductQuantity(
        cart.id,
        cart.version,
        lineItemId,
        newQuantity
      );
      if (updatedCart) {
        const updatedItems = updatedCart.lineItems.map(formatCartItem);
        setCartItems(updatedItems);
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

  if (loading) {
    return <p>Loading cart items...</p>;
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
        <div className="total-cost">
          <h3>Total:</h3>
          <p>${totalCost.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
};

export default BasketPage;

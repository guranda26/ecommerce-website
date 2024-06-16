// import React from 'react';
import shoppingCart from '../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Basket.css';
import { routes } from '../../modules/routes';

import React, { useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { getMyCart, getCart } from '../../../sdk/basketApi';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discounted?: number;
  quantity: number;
  totalPrice: number;
}

const BasketPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        const formattedItems = items?.map((item: LineItem) => ({
          id: item.id,
          name: item.name['en-US'],
          imageUrl: item?.variant?.images?.[0]?.url || '',
          // price: item.price.value.centAmount / 100,
          price: calculateDiscountedPrice(item),
          discounted: calculateDiscountedPrice(item),
          quantity: item.quantity,
          // totalPrice: (item.price.value.centAmount / 100) * item.quantity,
          totalPrice: calculateDiscountedPrice(item) * (item.quantity || 0),
        }));
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

  const calculateDiscountedPrice = (item: LineItem): number => {
    const basePrice = item.price.value.centAmount / 100;

    if (item.price.discounted) {
      const discountedPrice = item.price.discounted.value.centAmount / 100;
      return discountedPrice;
    }

    return basePrice;
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
    <section className="shopping-cart">
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
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BasketPage;

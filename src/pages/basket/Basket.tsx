// import React from 'react';
import shoppingCart from '../../assets/images/shopping-cart.png';
import { Link } from 'react-router-dom';
import './Basket.css';
import { routes } from '../../modules/routes';

const Basket = () => {
  return (
    <section className="shopping-cart">
      <h1 className="shopping-heading">Shopping Cart</h1>
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
};

export default Basket;

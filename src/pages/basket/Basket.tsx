// // import React from 'react';
// import shoppingCart from '../../assets/images/shopping-cart.png';
// import { Link } from 'react-router-dom';
// import './Basket.css';
// import { routes } from '../../modules/routes';

// const Basket = () => {
//   return (
//     <section className="shopping-cart">
//       <h1 className="shopping-heading">Shopping Cart</h1>
//       <div className="shopping-cart__items">
//         <img src={shoppingCart} alt="shopping cart" className="basket-img" />
//         <div className="text-content">
//           <h3 className="empty-cart">Your cart is empty</h3>
//           <p className="empty-cart empty-cart-msg">
//             <Link to={routes.catalog} className="cart-link">
//               Discover
//             </Link>{' '}
//             what you really want
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Basket;

import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../../sdk/cartItems'; // Assuming you have the getCartItems function

interface CartItem {
  id: string;
  name: { [key: string]: string };
  imageUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const BasketPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const items = await getCartItems();
        const formattedItems = items.map((item: any) => ({
          id: item.id,
          name: item.name['en-US'], // Adjust according to your locale
          imageUrl: item.variant.images[0].url,
          price: item.price.value.centAmount / 100,
          quantity: item.quantity,
          totalPrice: item.totalPrice.centAmount / 100,
        }));
        setCartItems(formattedItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Basket Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} width="50" />
              <h2>{item.name}</h2>
              <p>Price: €{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: €{item.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BasketPage;

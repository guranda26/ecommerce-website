// import React, { useEffect, useState } from 'react';
// import { fetchCartItems } from './basketApi';
// import { Cart, LineItem } from '@commercetools/platform-sdk';

// interface CartItem {
//   id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// }

// const CartItems: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCartItems = async () => {
//       try {
//         const cart: Cart = await fetchCartItems();
//         const items = cart.lineItems.map((item: LineItem) => ({
//           id: item.id,
//           name: item.name['en'],
//           imageUrl: item.variant.images[0]?.url || '',
//           price: item.price.value.centAmount / 100,
//           quantity: item.quantity,
//           totalPrice: (item.price.value.centAmount / 100) * item.quantity,
//         }));
//         setCartItems(items);
//       } catch (err) {
//         setError('Failed to fetch cart items.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCartItems();
//   }, []);

//   if (loading) {
//     return <p>Loading cart items...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="cart-items">
//       {cartItems.map((item) => (
//         <div key={item.id} className="cart-item">
//           <img
//             src={item.imageUrl}
//             alt={item.name}
//             className="cart-item-image"
//           />
//           <div className="cart-item-details">
//             <h3>{item.name}</h3>
//             <p>Price: ${item.price.toFixed(2)}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Total: ${item.totalPrice.toFixed(2)}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartItems;

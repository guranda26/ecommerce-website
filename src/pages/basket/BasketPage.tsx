// import React, { useState, useEffect } from 'react';
// import { getCartItems } from './api'; // Import the API function

// const BasketPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const items = await getCartItems();
//         setCartItems(items);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Your Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
//               <img
//                 src={item.variant.images[0].url}
//                 alt={item.name}
//                 style={{ width: '100px', marginRight: '10px' }}
//               />
//               <div>
//                 <h2>{item.name}</h2>
//                 <p>Price: ${item.price.value.centAmount / 100}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>
//                   Total: ${(item.price.value.centAmount / 100) * item.quantity}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default BasketPage;

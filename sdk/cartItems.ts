import { getToken, getMyToken, isExist, isExistAnonymToken } from './myToken';
import { projectKey, apiUrl } from './createClient';

export const getCartItems = async () => {
  // Ensure the token is available and valid
  if (!isExist() && !isExistAnonymToken()) {
    // Generate an anonymous token if neither exists
    await getMyToken();
  } else if (!isExist()) {
    // Ensure an anonymous token exists
    if (!isExistAnonymToken()) {
      await getMyToken();
    }
  } else {
    // Fetch the user token if it exists
    await getMyToken();
  }

  const token = getToken();

  if (!token) {
    throw new Error('Unable to retrieve access token');
  }

  const cart = JSON.parse(localStorage.getItem('myCartId') || '{}');
  const cartId = cart.id;

  if (!cartId) {
    throw new Error('No cart ID found in local storage');
  }

  const response = await fetch(`${apiUrl}/${projectKey}/me/carts/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch cart items');
  }

  const data = await response.json();
  return data.lineItems;
};

import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { clientMaker } from './createClient';

export const createCart = async (currency: string) => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
      // .me()
      .carts()
      .post({
        body: {
          currency: currency,
          country: 'DE',
        },
      })
      .execute();
    console.log('Cart: ', response);
    if (response.body) {
      setMyCartId(response.body);
    }
    return true;
  } catch (error) {
    console.error('Error fetching product :', error);
    return false;
  }
};

const setMyCartId = (cart: Cart) => {
  localStorage.setItem('myCartId', JSON.stringify(cart));
};

export const getMyCart = () => {
  const myCart = JSON.parse(localStorage.getItem('myCartId')!) as Cart;
  return myCart;
};

export const getCart = async (id: string) => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
      // .me()
      .carts()
      .withId({
        ID: id,
      })
      .get()
      .execute();

    if (!response.body) {
      throw new Error('No carts found for the current user.');
    }
    return response.body.lineItems;
  } catch (error) {
    console.error('Error fetching product :', error);
  }
};

const isExistCart = () => {
  return !!localStorage.getItem('myCartId');
};

export const addProductToCard = async (
  product: ProductProjection,
  cardId: string,
  quantity: number,
  version: number
) => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
      // .me()
      .carts()
      .withId({ ID: cardId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'addLineItem',
              productId: product.id,
              variantId: product.masterVariant.id,
              quantity: quantity,
            },
          ],
        },
      })
      .execute();
    if (response.body) {
      setMyCartId(response.body);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return false;
  }
};

export const findLineItem = (productId: string, cart: Cart) => {
  const lineItem = cart.lineItems.find(
    (element) => element.productId === productId
  );
  return lineItem;
};

export const deleteProductInCard = async (product: ProductProjection) => {
  const apiRoot = clientMaker();
  const cart = getMyCart();
  const lineItem = findLineItem(product.id, cart);
  try {
    const response = await apiRoot
      // .me()
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItem?.id,
              quantity: lineItem?.quantity,
              externalPrice: {
                currencyCode: 'EUR',
                centAmount: lineItem?.price.value.centAmount || 0,
              },
            },
          ],
        },
      })
      .execute();
    if (response.body) {
      setMyCartId(response.body);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching product :', error);
    return false;
  }
};

export const clearCart = async (cartId: string, version: number) => {
  const apiRoot = clientMaker(); // Ensure clientMaker is properly set up

  try {
    console.log('Making API call to clear cart:', cartId, version);

    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .delete({
        queryArgs: {
          version: version, // Use the correct version
        },
      })
      .execute();

    console.log('API response:', response);

    if (response.statusCode !== 204) {
      throw new Error('Failed to clear the cart.');
    }

    console.log('Cart cleared successfully');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear the cart. Please try again later.');
  }
};

export const removeProductFromCart = async (
  cartId: string,
  version: number,
  lineItemId: string
) => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();
    if (response.body) {
      setMyCartId(response.body); // Update the cart in local storage
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return false;
  }
};

export const addToBasket = async (product: ProductProjection, num: number) => {
  let isCreatedCart = true;
  let isAddedProduct = false;
  if (!isExistCart()) {
    isCreatedCart = await createCart('EUR');
  }
  if (isCreatedCart) {
    const myCart = getMyCart();
    isAddedProduct = await addProductToCard(
      product,
      myCart?.id,
      num,
      myCart?.version
    );
  }
  return isAddedProduct;
};

export const isExistProductMyCart = (productId: string) => {
  const myCart = getMyCart();
  let isExistProduct = false;
  if (myCart) {
    myCart.lineItems.forEach((product) => {
      if (product.productId === productId) isExistProduct = true;
    });
  }

  return isExistProduct;
};

export const updateProductQuantity = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity: number
) => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItemId,
              quantity: quantity,
            },
          ],
        },
      })
      .execute();
    if (response.body) {
      setMyCartId(response.body);
      return response.body;
    }
  } catch (error) {
    console.error('Error updating product quantity:', error);
  }
  return null;
};

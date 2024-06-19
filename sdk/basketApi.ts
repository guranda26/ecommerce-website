import { Cart, CartUpdateAction, ProductProjection } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { isExist, isExistAnonymToken } from './myToken';

export const createCart = async (
  currency: string,
  apiRoot: ByProjectKeyRequestBuilder
) => {
  const response = await apiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: currency,
        country: 'DE',
      },
    })
    .execute();
  return response.body;
};

export const getMyCart = async (
  apiRoot: ByProjectKeyRequestBuilder
): Promise<Cart | null> => {
  let myCart: Cart | null = null;
  try {
    if (isExistAnonymToken()) {
      const response = await apiRoot.me().carts().get().execute();
      if (response.statusCode === 200 && response.body.results.length > 0) {
        myCart = response.body.results[0];
      }
    } else if (isExist()) {
      const response = await apiRoot.me().activeCart().get().execute();
      if (response.statusCode === 200) {
        myCart = response.body;
      }
    }

    if (!myCart) {
      myCart = await createCart('EUR', apiRoot);
    }
  } catch (error) {
    console.error('Error getting Cart :', error);
  }
  return myCart;
};

export const getCart = async (
  id: string,
  apiRoot: ByProjectKeyRequestBuilder
) => {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .get()
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export const addProductToCart = async (
  product: ProductProjection,
  quantity: number,
  cart: Cart,
  apiRoot: ByProjectKeyRequestBuilder
) => {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({
        ID: cart.id,
      })
      .post({
        body: {
          version: cart.version,
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
    return response;
  } catch (error) {
    console.error('Error adding product :', error);
  }
};

export const findLineItem = (productId: string, cart: Cart) => {
  const lineItem = cart.lineItems.find(
    (element) => element.productId === productId
  );
  return lineItem;
};

export const deleteProductInCart = async (
  product: ProductProjection,
  cart: Cart,
  apiRoot: ByProjectKeyRequestBuilder
) => {
  if (cart) {
    const lineItem = findLineItem(product.id, cart);
    try {
      const response = await apiRoot
        .me()
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
      return response;
    } catch (error) {
      console.error('Error deleting product :', error);
    }
  }
};

export const removeProductFromCart = async (
  apiRoot: ByProjectKeyRequestBuilder,
  cartId: string,
  version: number,
  lineItemId: string
) => {
  try {
    const response = await apiRoot
      .me()
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
    return response.body;
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
};

export const updateProductQuantity = async (
  apiRoot: ByProjectKeyRequestBuilder,
  cartId: string,
  version: number,
  lineItemId: string,
  newQuantity: number
) => {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItemId,
              quantity: newQuantity,
            },
          ],
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error updating product quantity:', error);
  }
};

export const isExistProductMyCart = (productId: string, cart: Cart) => {
  const product = findLineItem(productId, cart);
  return product !== undefined;
};

export const applyPromoCodeToCart = async (
  apiRoot: ByProjectKeyRequestBuilder,
  cartId: string,
  version: number,
  promoCode: string
) => {
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code: promoCode,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Error applying promo code to cart:', error);
    return null;
  }
};

export const clearBasket = async (
  apiRoot: ByProjectKeyRequestBuilder,
  cart: Cart,
) => {
  const { lineItems, id, version } = cart;
  const actions = lineItems.map((lineItem) => {
    return {
      action: 'removeLineItem',
      lineItemId: lineItem?.id,
      quantity: lineItem?.quantity,
      externalPrice: {
        currencyCode: 'EUR',
        centAmount: lineItem?.price.value.centAmount || 0,
      },
    }
  }
  ) as CartUpdateAction[];

  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();

    if (response.statusCode === 200) return response.body;
  } catch (error) {
    console.error('Error clear basket:', error);
  }
  return null;
}
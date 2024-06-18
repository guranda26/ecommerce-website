import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { isExist, isExistAnonymToken } from './myToken';


export const createCart = async (currency: string, apiRoot: ByProjectKeyRequestBuilder) => {
    const response = await apiRoot
        .me()
        .carts()
        .post({
            body: {
                currency: currency,
                country: 'DE',
            }
        })
        .execute();
    return response.body;
}

export const getMyCart = async (apiRoot: ByProjectKeyRequestBuilder) => {
    let myCart: Cart | null = null;
    try {
        if (isExist()) {
            const response = await apiRoot
                .me()
                .activeCart()
                .get()
                .execute();
            myCart = response.body;
        }
        if (isExistAnonymToken()) {
            const response = await apiRoot
                .me()
                .carts()
                .get()
                .execute();
            if (response.statusCode === 200) {
                myCart = response.body.results[0];
            }
        }
        if (!myCart) {
            myCart = await createCart('EUR', apiRoot);
        }
    } catch (error) {
        console.error('Error getting Cart :', error);
    }
    return myCart;
}

// export const getCart = async (id: string) => {
//     console.log("getCart...");
//     const apiRoot = clientMaker();
//     try {
//         const response = await apiRoot
//             .me()
//             .carts()
//             .withId({
//                 ID: id
//             })
//             .get()
//             .execute();
//         return response.body;
//     } catch (error) {
//         console.error('Error fetching product :', error);
//     }
// }

export const addProductToCart = async (product: ProductProjection, quantity: number, cart: Cart, apiRoot: ByProjectKeyRequestBuilder) => {
    try {
        const response = await apiRoot
            .me()
            .carts()
            .withId({
                ID: cart.id
            })
            .post({

                body: {
                    version: cart.version,
                    actions: [
                        {
                            action: "addLineItem",
                            productId: product.id,
                            variantId: product.masterVariant.id,
                            quantity: quantity
                        }
                    ]
                }
            })
            .execute();
        return response;

    } catch (error) {
        console.error('Error adding product :', error);
    }
}


export const findLineItem = (productId: string, cart: Cart) => {
    const lineItem = cart.lineItems.find((element) => element.productId === productId);
    return lineItem;
}


export const deleteProductInCart = async (product: ProductProjection, cart: Cart, apiRoot: ByProjectKeyRequestBuilder) => {
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
                                action: "removeLineItem",
                                lineItemId: lineItem?.id,
                                quantity: lineItem?.quantity,
                                externalPrice: {
                                    currencyCode: "EUR",
                                    centAmount: lineItem?.price.value.centAmount || 0,
                                },
                            }

                        ]
                    }
                })
                .execute();
            return response;
        } catch (error) {
            console.error('Error deleting product :', error);
        }
    }
}

export const isExistProductMyCart = (productId: string, cart: Cart) => {
    const myCart = cart;
    const product = myCart.lineItems.find((product) => product.productId === productId);
    if (product) return true;
    return false;
}



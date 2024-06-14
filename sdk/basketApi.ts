import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { clientMaker } from './createClient';

export const createCart = async (currency: string) => {
    const apiRoot = clientMaker();
    try {
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
        console.log("Cart: ", response);
        if (response.body) {
            setMyCartId(response.body);
        }
        return true;

    } catch (error) {
        console.error('Error fetching product :', error);
        return false;
    }
}

const setMyCartId = (cart: Cart) => {
    localStorage.setItem('myCartId', JSON.stringify(cart));
}


export const getCart = async (id: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .me()
            .carts()
            .withId({
                ID: id
            })
            .get()
            .execute();
        return response.body;
    } catch (error) {
        console.error('Error fetching product :', error);
    }
}

const isExistCart = () => {
    return !!localStorage.getItem('myCartId');
}

export const addProductToCard = async (product: ProductProjection, cardId: string, quantity: number, version: number) => {
    const apiRoot = clientMaker();
    try {
        console.log(cardId);
        const response = await apiRoot
            .me()
            .carts()
            .withId({ ID: cardId })
            .post({

                body: {
                    version: version,
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
        console.log(response);
        if (response.body) {
            setMyCartId(response.body);
            return true;
        }
        return false;

    } catch (error) {
        console.error('Error fetching product :', error);
        return false;
    }
}

export const addToBasket = async (product: ProductProjection, num: number) => {
    let isCreatedCart = true;
    let isAddedProduct = false;
    if (!isExistCart()) {
        isCreatedCart = await createCart('EUR');
    }
    if (isCreatedCart) {
        const myCart = JSON.parse(localStorage.getItem('myCartId')!) as Cart;
        isAddedProduct = await addProductToCard(product, myCart?.id, num, myCart?.version);
    }
    return isAddedProduct;
}


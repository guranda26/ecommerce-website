
import { clientMaker } from './createClient';




export const getProductsByName = async (str: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    limit: 500
                }
            })
            .execute()
            .then((products) => {
                return products.body.results.filter((product) => product.name['en-US'].toLowerCase().includes(str.toLowerCase()));
            }).then((res) => res);
        console.log("response:::", response);
        return response;

    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}


export const sortProductByPrice = async (type: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    limit: 200,
                    sort: `price ${type}`,
                    priceCurrency: 'EUR'
                }
            })
            .execute();
        if (response.body) {
            return response;
        }
    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}

type Filter = {
    color: string | undefined,
    discount: boolean | undefined
};

export const multipleFilterProducts = async (filterValue: Filter) => {
    let filterColor = '';
    filterColor = `variants.attributes.color-filter.key:"${filterValue.color}"`;
    const discountted = filterValue.discount ? 'variants.prices.discounted:exists' : '';
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get(
                {
                    queryArgs: {
                        limit: 200,
                        filter: filterValue.color === 'Choose color' ? [discountted] : [filterColor, discountted],
                    },

                }
            )
            .execute();
        if (response.body) {
            return response;
        }
    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}



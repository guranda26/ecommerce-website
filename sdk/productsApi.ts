
import { clientMaker } from './createClient';

export const getProductsByName = async (str: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    limit: 200,
                    fuzzy: true,
                    fuzzyLevel: 1,
                    'text.en-US': `${str}`,
                }
            })
            .execute();
        return response.body.results;

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
    discount: boolean | undefined,
    lowPrice: number,
    highPrice: number,
};

export const multipleFilterProducts = async (filterValue: Filter) => {
    let filterColor = '';
    filterColor = `variants.attributes.color-filter.key:"${filterValue.color}"`;
    const discountted = filterValue.discount ? 'variants.prices.discounted:exists' : '';
    const rangePrice = `variants.price.centAmount: range(${filterValue.lowPrice} to ${filterValue.highPrice})`;
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get(
                {
                    queryArgs: {
                        limit: 200,
                        filter: filterValue.color === 'Choose color' ? [discountted, rangePrice] : [filterColor, discountted, rangePrice],
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



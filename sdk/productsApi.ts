
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
    lowPrice?: number,
    highPrice?: number,
};

export const multipleFilterProducts = async (filterValue: Filter) => {
    let filterColor = '';
    filterColor = `variants.attributes.color-filter.key:"${filterValue.color}"`;
    const discountted = filterValue.discount ? 'variants.prices.discounted:exists' : '';
    const rangePrice = (filterValue.highPrice && filterValue.lowPrice) ?
        `variants.price.centAmount: range(${filterValue.lowPrice} to ${filterValue.highPrice})` : '';
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


export const getProducts = async (page: number) => {
    const apiRoot = clientMaker();
    try {
      const response = await apiRoot
        .productProjections()
        .get({
          queryArgs: {
            limit: page * 20,
          },
        })
        .execute();
      return response;
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(`Failed to get products: ${errorMessage}`);
    }
  };


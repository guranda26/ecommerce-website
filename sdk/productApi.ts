import { ProductProjection } from '@commercetools/platform-sdk';
import processProductData from '../src/components/processProductData/processProductData';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';


export const getProductDetails = async (apiRoot: ByProjectKeyRequestBuilder) => {
  try {
    const response = await apiRoot
      .products()
      .get()
      .execute();

    const products = response.body.results.map((product) => {
      return processProductData(product.masterData.current, product.id);
    });
    return products;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const getProductById = async (id: string, apiRoot: ByProjectKeyRequestBuilder): Promise<ProductProjection> => {

  try {
    const response = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();

    const responseData = response.body;
    return responseData;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// import { ProductData } from '@commercetools/platform-sdk';
import { Product } from '../src/Interfaces/CustomerInterface';
import { apiRoot } from './client';
import { projectKey } from './ClientBuilder';
import processProductData from '../src/components/processProductData/processProductData';

export const getProductDetails = async () => {
  try {
    const response = await apiRoot()
      .withProjectKey({ projectKey })
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

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await apiRoot()
      .withProjectKey({ projectKey })
      .products()
      .withId({ ID: id })
      .get()
      .execute();

    const responseData = response.body;
    return processProductData(responseData.masterData.current, responseData.id);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

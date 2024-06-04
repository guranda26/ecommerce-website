import { Product } from '../src/Interfaces/CustomerInterface';
import processProductData from '../src/components/processProductData/processProductData';
import { clientMaker } from './createClient';

export const getProductDetails = async () => {
  const apiRoot = clientMaker();

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

export const getProductById = async (id: string): Promise<Product> => {
  const apiRoot = clientMaker();
  try {
    const response = await apiRoot
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

import { Product } from '../src/Interfaces/CustomerInterface';
import { apiRoot } from './client';
import { projectKey } from './ClientBuilder';

export const getProductDetails = async () => {
  try {
    const response = await apiRoot()
      .withProjectKey({ projectKey })
      .products()
      .get()
      .execute();
    const products = response.body.results.map((product) => {
      const {
        name,
        masterVariant,
        description = {},
      } = product.masterData.current;
      console.log(masterVariant);

      return {
        id: product.id,
        name: name['en-US'] || name['en-GB'] || 'No name available',
        description: description['en-US'] || description['en-US'] || '',
        imageUrl:
          masterVariant?.images?.[0]?.url || 'https://via.placeholder.com/1400',
        images: masterVariant?.images?.map((img) => img.url) || [],
      };
    });
    return products;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// interface ProductResponseBody {
//   id: string;
//   masterData: {
//     current: {
//       name?: { en?: string };
//       description?: { en?: string };
//       masterVariant?: {
//         images?: { url?: string }[];
//       };
//     };
//   };
// }

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await apiRoot()
      .withProjectKey({ projectKey })
      .products()
      .withId({ ID: id })
      .get()
      .execute();

    const responseData = response.body;
    console.log('Response Data:', responseData);
    const product: Product = {
      id: responseData.id,
      name:
        responseData.masterData.current.name['en-US'] ||
        responseData.masterData.current.name['en-GB'] ||
        'No name available',
      description:
        responseData.masterData.current?.description['en-US'] ||
        'No description available',
      imageUrl:
        responseData.masterData.current.masterVariant?.images?.[0]?.url ||
        'https://via.placeholder.com/1400',
      images:
        responseData.masterData.current.masterVariant?.images?.map(
          (img) => img.url
        ) || [],
    };
    console.log(product.images);

    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

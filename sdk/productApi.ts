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
      const { name, masterVariant, metaDescription } =
        product.masterData.current;
      console.log(masterVariant);

      return {
        id: product.id,
        name: name['en-US'] || 'No name available',
        description: metaDescription?.en || '',
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
//       metaDescription?: { en?: string };
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
        responseData.masterData.current.name['en-US'] || 'No name available',
      description:
        responseData.masterData.current.metaDescription?.en ||
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

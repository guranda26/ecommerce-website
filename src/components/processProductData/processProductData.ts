import { ProductData } from '@commercetools/platform-sdk';
import { Product } from 'src/Interfaces/CustomerInterface';

const processProductData = (productData: ProductData, id: string): Product => {
  if (!productData) {
    throw new Error('Product data is undefined.');
  }

  const { name = {}, description = {}, masterVariant } = productData;

  const imageUrl: string =
    masterVariant?.images?.[0]?.url || 'https://via.placeholder.com/1400';
  const images: string[] = masterVariant?.images?.map((img) => img.url) || [];

  return {
    id: id,
    name: name['en-US'] || name['en-GB'] || 'No name available',
    description:
      description['en-US'] ||
      description['en-GB'] ||
      'No description available',
    imageUrl: imageUrl,
    images: images,
  };
};

export default processProductData;

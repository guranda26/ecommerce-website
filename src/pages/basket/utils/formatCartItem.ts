import { LineItem } from '@commercetools/platform-sdk';
import { CartItem } from 'src/Interfaces/CustomerInterface';

export const calculateDiscountedPrice = (item: LineItem): number => {
  const basePrice = item.price.value.centAmount / 100;

  if (item.price.discounted) {
    const discountedPrice = item.price.discounted.value.centAmount / 100;
    return discountedPrice;
  }

  return basePrice;
};

export const formatCartItem = (item: LineItem): CartItem => ({
  id: item.id,
  name: item.name['en-US'],
  imageUrl: item?.variant?.images?.[0]?.url ?? '',
  price: calculateDiscountedPrice(item),
  discounted: calculateDiscountedPrice(item),
  quantity: item.quantity,
  totalPrice: calculateDiscountedPrice(item) * (item.quantity || 0),
  lineItemId: item.id,
});

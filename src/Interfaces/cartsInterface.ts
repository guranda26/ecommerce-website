export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discounted: number;
  quantity: number;
  totalPrice: number;
  lineItemId: string;
}

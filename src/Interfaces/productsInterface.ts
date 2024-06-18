import { ProductProjection } from '@commercetools/platform-sdk';

export interface ProductsInterface {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}

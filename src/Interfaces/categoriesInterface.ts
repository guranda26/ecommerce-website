import { Category, ProductProjection } from '@commercetools/platform-sdk';

export interface CategoriesParentsType {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
  parentId: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
  subParentId?: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
}

export interface CategoriesType extends CategoriesParentsType {
  categories: Category[];
}

export interface CategoryType extends CategoriesParentsType {
  category: Category;
}

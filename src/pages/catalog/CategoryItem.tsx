import { Category, ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { getProductsByCategory } from '../../../sdk/categoryApi';

function CategoriesItem(props: {
  category: Category;
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const handleCategory = async (id: string) => {
    const products = await getProductsByCategory(id);
    props.setProducts(products.body.results);
  };

  return (
    <li
      className="category-item"
      onClick={() => handleCategory(props.category.id)}
    >
      {props.category.name['en-US']}
    </li>
  );
}

export default CategoriesItem;

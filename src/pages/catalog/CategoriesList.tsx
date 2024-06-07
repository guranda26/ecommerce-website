import React from 'react';
import CategoriesItem from './CategoryItem';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

function CategoriesList(props: {
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  return (
    <ul className="categories-list">
      {props.categories.map((category) => {
        if (category.ancestors.length === 0)
          return (
            <CategoriesItem
              category={category}
              setProducts={props.setProducts}
              key={category.id}
            />
          );
      })}
    </ul>
  );
}

export default CategoriesList;

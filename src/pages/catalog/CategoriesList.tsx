import React from 'react';
import CategoriesItem from './CategoryItem';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

function CategoriesList(props: {
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const handleAllItem = async (element: HTMLLIElement) => {
    props.setProducts(null);
    element.parentElement?.childNodes.forEach((el) => {
      const liElement = el as HTMLLIElement;
      liElement.classList.remove('active');
    });
    element.classList.add('active');
  };

  return (
    <ul className="categories-list">
      <li
        className="category-item active"
        onClick={(e) => handleAllItem(e.target as HTMLLIElement)}
      >
        All
      </li>
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

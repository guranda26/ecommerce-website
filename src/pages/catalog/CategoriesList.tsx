import React from 'react';
import CategoriesItem from './CategoryItem';
import { Category } from '@commercetools/platform-sdk';

function CategoriesList(props: { categories: Category[] }): React.JSX.Element {
  return (
    <ul className="categories-list">
      {props.categories.map((category) => {
        return <CategoriesItem category={category} key={category.id} />;
      })}
    </ul>
  );
}

export default CategoriesList;

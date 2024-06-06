import { Category } from '@commercetools/platform-sdk';
import React from 'react';

function CategoriesItem(props: { category: Category }): React.JSX.Element {
  return (
    <li className="category-item">
      {props.category.name['en-US']}
      {/* <CategoriesList /> */}
    </li>
  );
}

export default CategoriesItem;

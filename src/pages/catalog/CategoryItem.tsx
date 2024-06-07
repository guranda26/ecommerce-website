import { Category, ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { getProductsByCategory } from '../../../sdk/categoryApi';

function CategoriesItem(props: {
  category: Category;
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const handleCategory = async (id: string, element: HTMLLIElement) => {
    const products = await getProductsByCategory(id);
    props.setProducts(products.body.results);
    element.parentElement?.childNodes.forEach((el) => {
      const liElement = el as HTMLLIElement;
      liElement.classList.remove('active');
    });
    element.classList.add('active');
  };

  return (
    <li
      className="category-item"
      onClick={(e) =>
        handleCategory(props.category.id, e.target as HTMLLIElement)
      }
    >
      {props.category.name['en-US']}
    </li>
  );
}

export default CategoriesItem;

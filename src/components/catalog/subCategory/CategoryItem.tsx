import { Category, ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { getProductsByCategory } from '../../../../sdk/categoryApi';

function CategoriesItem(props: {
  category: Category;
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
  parentId?: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
  subParentId?: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
}): React.JSX.Element {
  const removeActiveClass = (element: HTMLLIElement) => {
    element.parentElement?.childNodes.forEach((el) => {
      const liElement = el as HTMLLIElement;
      liElement.classList.remove('active');
    });
  };

  const handleCategory = async (id: string, element: HTMLLIElement) => {
    removeActiveClass(element);
    element.classList.add('active');
    if (props.parentId) {
      props.parentId.setParentId(id);
      if (props.subParentId) props.subParentId.setParentId('');
    }
    const products = await getProductsByCategory(id);

    props.setProducts(products.body.results);
  };

  return (
    <li
      className="category-item"
      onClick={(e) =>
        void handleCategory(props.category.id, e.target as HTMLLIElement)
      }
    >
      {props.category.name['en-US']}
    </li>
  );
}

export default CategoriesItem;

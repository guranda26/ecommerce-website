import React, { useContext } from 'react';
import { getProductsByCategory } from '../../../../sdk/categoryApi';
import { UserContext } from '../../../context/userContext';
import { CategoryType } from '../../../Interfaces/categoriesInterface';

function CategoriesItem(props: CategoryType): React.JSX.Element {
  const { apiRoot } = useContext(UserContext);
  const { category, parentId, subParentId, setProducts } = props;

  const removeActiveClass = (element: HTMLLIElement) => {
    element.parentElement?.childNodes.forEach((el) => {
      const liElement = el as HTMLLIElement;
      liElement.classList.remove('active');
    });
  };

  const handleCategory = async (id: string, element: HTMLLIElement) => {
    removeActiveClass(element);
    element.classList.add('active');
    if (parentId) {
      parentId.setParentId(id);

      if (subParentId) {
        subParentId.setParentId('');
      }
    }

    const products = await getProductsByCategory(id, apiRoot!);

    setProducts(products.body.results);
  };

  return (
    <li
      className="category-item"
      onClick={(e) =>
        void handleCategory(category.id, e.target as HTMLLIElement)
      }
    >
      {category.name['en-US']}
    </li>
  );
}

export default CategoriesItem;

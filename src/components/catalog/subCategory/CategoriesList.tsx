import React from 'react';
import CategoriesItem from './CategoryItem';
import { CategoriesType } from 'src/Interfaces/categoriesInterface';

function CategoriesList(props: CategoriesType): React.JSX.Element {
  const { setProducts, parentId, categories, subParentId } = props;

  const handleAllItem = (element: HTMLLIElement) => {
    setProducts(null);
    parentId.setParentId('');
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
      {categories.map((category) => {
        if (category.ancestors.length === 0)
          return (
            <CategoriesItem
              category={category}
              setProducts={setProducts}
              key={category.id}
              parentId={parentId}
              subParentId={subParentId}
            />
          );
      })}
    </ul>
  );
}

export default CategoriesList;

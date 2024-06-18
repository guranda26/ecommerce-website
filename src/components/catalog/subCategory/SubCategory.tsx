import React, { useEffect, useState } from 'react';
import CategoriesItem from './CategoryItem';
import { Category } from '@commercetools/platform-sdk';
import './subCategory.css';
import { CategoriesType } from 'src/Interfaces/categoriesInterface';

function SubCategory(props: CategoriesType): React.JSX.Element {
  const { parentId, categories, subParentId, setProducts } = props;
  const [subcategory, setSubcategory] = useState<Category[]>([]);

  useEffect(() => {
    if (parentId.parentId != '') {
      const subCategories = categories.filter(
        (category) => category.parent?.id === parentId.parentId
      );
      setSubcategory(subCategories);
    }
  }, [parentId.parentId, categories]);

  if (parentId.parentId === '') return <></>;
  return (
    <ul className="categories-list subchild-category">
      {subcategory.map((cat) => {
        return (
          <CategoriesItem
            category={cat}
            setProducts={setProducts}
            key={cat.id}
            parentId={subParentId!}
          />
        );
      })}
    </ul>
  );
}

export default SubCategory;

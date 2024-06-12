import React, { useEffect, useState } from 'react';
import CategoriesItem from './CategoryItem';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import './subCategory.css';

function SubCategory(props: {
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
  parentId: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
  subParentId?: {
    parentId: string;
    setParentId: React.Dispatch<React.SetStateAction<string>>;
  };
}): React.JSX.Element {
  const [subcategory, setSubcategory] = useState<Category[]>([]);

  useEffect(() => {
    if (props.parentId.parentId != '') {
      const subCategories = props.categories.filter(
        (category) => category.parent?.id === props.parentId.parentId
      );
      setSubcategory(subCategories);
    }
  }, [props.parentId.parentId, props.categories]);

  if (props.parentId.parentId === '') return <></>;
  return (
    <ul className="categories-list subchild-category">
      {subcategory.map((cat) => {
        return (
          <CategoriesItem
            category={cat}
            setProducts={props.setProducts}
            key={cat.id}
            parentId={props.subParentId}
          />
        );
      })}
    </ul>
  );
}

export default SubCategory;

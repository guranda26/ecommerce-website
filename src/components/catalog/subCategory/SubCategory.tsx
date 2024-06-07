import React, { useCallback, useEffect, useState } from 'react';
import CategoriesItem from '../../../pages/catalog/CategoryItem';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import './subCategory.css'
import { getByParentCategory } from '../../../../sdk/categoryApi';

function SubCategory(props: {
    setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
    parentId: {
        parentId: string,
        setParentId: React.Dispatch<React.SetStateAction<string>>
    }
    subParentId: {
        parentId: string,
        setParentId: React.Dispatch<React.SetStateAction<string>>
    }
}): React.JSX.Element {
    const [category, setCategory] = useState<Category[]>([]);

    const getSubCategory = useCallback(async () => {
        const response = await getByParentCategory(props.parentId.parentId);
        setCategory(response.body.results)
    }, [props.parentId]
    );

    useEffect(() => {
      void getSubCategory();
    }, [getSubCategory])


    return (
        <ul className="categories-list subchild-category">
            {category.map((cat) => {
                if (cat.ancestors.length === 1)
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

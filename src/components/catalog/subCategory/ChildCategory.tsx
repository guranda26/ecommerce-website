import React, { useCallback, useEffect, useState } from 'react';
import CategoriesItem from '../../../pages/catalog/CategoryItem';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import './subCategory.css';
import { getByParentCategory } from '../../../../sdk/categoryApi';

function ChildCategory(props: {
    setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
    parentId: {
        parentId: string,
        setParentId: React.Dispatch<React.SetStateAction<string>>
    }
}): React.JSX.Element {
    const [category, setCategory] = useState<Category[]>([]);

    const getSubCategory = useCallback(async () => {
        if (props.parentId.parentId !== '') {
            const response = await getByParentCategory(props.parentId.parentId);
            setCategory(response.body.results);
        }
    }, [props.parentId]);

    useEffect(() => {
        void getSubCategory();
    }, [getSubCategory]);

    return (
        <ul className="categories-list child-category">
            {category.map((cat) => {
                if (cat.ancestors.length === 2)
                    return (
                        <CategoriesItem
                            category={cat}
                            setProducts={props.setProducts}
                            key={cat.id}
                        />
                    );
            })}
        </ul>
    );
}

export default ChildCategory;
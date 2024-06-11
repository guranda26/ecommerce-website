import React, { useState, useEffect, useCallback } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import CategoriesList from './CategoriesList';
import SubCategory from './SubCategory';
import { getCategories } from '../../../../sdk/categoryApi';

function Categories(props: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const [response, setResponse] = useState<Category[]>([]);
  const [parentId, setParentId] = useState('');
  const [subParentId, setSubParentId] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const res = await getCategories();
      if (res.statusCode === 200) {
        setResponse(() => [...res.body.results]);
      }
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      console.log(message);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <div>
      <CategoriesList
        categories={response}
        setProducts={props.setProducts}
        parentId={{ parentId, setParentId }}
        subParentId={{ parentId: subParentId, setParentId: setSubParentId }}
      />
      <SubCategory
        categories={response}
        setProducts={props.setProducts}
        parentId={{ parentId, setParentId }}
        subParentId={{ parentId: subParentId, setParentId: setSubParentId }}
      />
      <SubCategory
        categories={response}
        setProducts={props.setProducts}
        parentId={{ parentId: subParentId, setParentId: setSubParentId }}
      />
    </div>
  );
}

export default Categories;

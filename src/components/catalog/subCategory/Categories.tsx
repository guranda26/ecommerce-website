import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Category } from '@commercetools/platform-sdk';
import CategoriesList from './CategoriesList';
import SubCategory from './SubCategory';
import { getCategories } from '../../../../sdk/categoryApi';
import { UserContext } from '../../../context/userContext';
import { ProductsInterface } from '../../../Interfaces/productsInterface';

function Categories(props: ProductsInterface): React.JSX.Element {
  const [response, setResponse] = useState<Category[]>([]);
  const [parentId, setParentId] = useState('');
  const [subParentId, setSubParentId] = useState('');
  const { apiRoot } = useContext(UserContext);

  const fetchData = useCallback(async () => {
    try {
      const res = await getCategories(apiRoot!);
      if (res.statusCode === 200) {
        setResponse(() => [...res.body.results]);
      }
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      console.log(message);
    }
  }, [apiRoot]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <div className="categories">
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

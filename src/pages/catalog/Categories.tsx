import React, { useState, useEffect, useCallback } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { clientMaker } from '../../../sdk/createClient';
import CategoriesList from './CategoriesList';

function Categories(props: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const [response, setResponse] = useState<Category[]>([]);

  const fetchData = useCallback(async () => {
    const apiRoot = clientMaker();
    const getProducts = async () => {
      try {
        const response = await apiRoot.categories().get().execute();
        return response;
      } catch (error) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(`Failed to get products: ${errorMessage}`);
      }
    };

    try {
      const res = await getProducts();
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
    <>
      <CategoriesList categories={response} setProducts={props.setProducts} />
    </>
  );
}

export default Categories;

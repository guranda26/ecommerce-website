import React, { useState, useEffect, useCallback, useContext } from 'react';
import ProductsList from './ProductsList';
import { ProductProjection } from '@commercetools/platform-sdk';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProducts } from '../../../sdk/productsApi';
import { UserContext } from '../../context/userContext';

function LoadProducts(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [response, setResponse] = useState<ProductProjection[]>([]);
  const { apiRoot } = useContext(UserContext);

  const fetchData = useCallback(async () => {
    try {
      const res = await getProducts(page, apiRoot!);
      if (res.statusCode === 200) {
        setResponse(() => [...res.body.results]);
        setTotal(() => res.body.total || 0);
      }
    } catch (error: unknown) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      setErrorMessage(message);
      console.log(message);
    } finally {
      setLoading(false);
    }
  }, [page, apiRoot]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      {loading && <div className="loading-text">Loading...</div>}
      {errorMessage && (
        <div>
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
      <ProductsList products={response} />
      {total && total > response.length ? (
        <button className="more-btn" onClick={loadMore}>
          {' '}
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoadProducts;

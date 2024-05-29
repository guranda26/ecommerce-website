import { useState, useEffect, useCallback } from 'react';
import { getProductById, getProductDetails } from '../../sdk/productApi';
import { Product } from 'src/Interfaces/CustomerInterface';

type FetchFunction<T> = () => Promise<T>;
type SetDataFunction<T> = (data: T) => void;

const useProducts = (id: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async <T>(
      fetchFunction: FetchFunction<T>,
      setData: SetDataFunction<T>,
      errorMessage: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFunction();
        setData(data);
      } catch (err) {
        console.error(errorMessage, err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (id) {
        await fetchData<Product>(
          () => getProductById(id || ''),
          setProduct,
          'Error fetching product details.'
        );
      } else {
        setError('No product ID provided.');
        setLoading(false);
      }
    };

    void fetchDataAsync();
  }, [id, fetchData]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData<Product[]>(
        getProductDetails,
        setProducts,
        'Error fetching products'
      );
    };

    void fetchDataAsync();
  }, [fetchData]);

  return { product, products, loading, error };
};

export default useProducts;

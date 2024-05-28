import { useState, useEffect } from 'react';
import { getProductDetails } from '../../../sdk/productApi';
import { useNavigate } from 'react-router-dom';
import { Product } from 'src/Interfaces/CustomerInterface';
import './Product.css';

function Products(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productList = await getProductDetails();
        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    }

    void fetchProducts();
  }, []);

  const handleProductClick = (productId: string): void => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-container">
      <h2>Products Example Page</h2>
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <h4>{product.name}</h4>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '100px', height: '100px' }}
                className="product-image"
              />
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;

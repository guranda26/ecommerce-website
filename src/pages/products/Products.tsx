import { useNavigate } from 'react-router-dom';
import './Product.css';
import useProducts from '../../hooks/useProduct';
import { ProductsProps } from 'src/Interfaces/CustomerInterface';

function Products({ productId }: ProductsProps): React.JSX.Element {
  const { product, products, loading, error } = useProducts(productId || null);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleProductClick = (productId: string): void => {
    navigate(`/catalog/${productId}`);
  };

  return (
    <div className="products-container">
      <h2>Products Example Page</h2>
      {product && (
        <div>
          <h3>Product Details</h3>
          <div className="product-item">
            <h4>{product.name}</h4>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100px', height: '100px' }}
              className="product-image"
            />
            <p>{product.description}</p>
          </div>
        </div>
      )}
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map((prod) => (
            <li
              key={prod.id}
              className="product-item"
              onClick={() => handleProductClick(prod.id)}
            >
              <h4>{prod.name}</h4>
              <img
                src={prod.imageUrl}
                alt={prod.name}
                style={{ width: '100px', height: '100px' }}
                className="product-image"
              />
              <p>{prod.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;

import { Product } from '@commercetools/platform-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './catalog.css';

function PoductsList(props: { products: Product[] }): React.JSX.Element {
  const navigate = useNavigate();
  const products = props.products;

  const productClickHandle = (id: string) => {
    navigate(`/catalog/${id}`);
  };

  return (
    <ul className="products-list">
      {products &&
        products.map((product) => (
          <li key={product.id} onClick={() => productClickHandle(product.id)}>
            <img
              src={
                product.masterData.staged.masterVariant.images![0].url ||
                'https://placehold.co/300x300.png?text=Without+Image'
              }
              alt={`${product.masterData.staged.name['en-US']} image`}
              width={300}
              height={300}
            />
            <h3>{product.masterData.staged.name['en-US']}</h3>
          </li>
        ))}
    </ul>
  );
}

export default PoductsList;

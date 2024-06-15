import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import './catalog.css';
import ProductItem from './ProductItem';

function PoductsList(props: {
  products: ProductProjection[];
}): React.JSX.Element {
  const products = props.products;

  return (
    <>
      <p className="total">
        Total Products: <span>{products.length}</span>
      </p>
      <ul className="products-list">
        {products &&
          products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
      </ul>
    </>
  );
}

export default PoductsList;

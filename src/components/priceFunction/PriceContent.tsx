import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import './priceContent.css';
import { getPrice } from './getPrice';

function PriceContent(props: {
  product: ProductProjection;
}): React.JSX.Element {
  return (
    <div className="price-content">
      <span
        className={
          getPrice(props.product).discountPrice
            ? 'price discount-price'
            : 'price'
        }
      >
        {getPrice(props.product).price}
      </span>
      <span className="price discount">
        {getPrice(props.product).discountPrice}
      </span>
    </div>
  );
}

export default PriceContent;

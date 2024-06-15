import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import './availableQuantity.css';

function AvailableQuantity(props: {
  product: ProductProjection;
}): React.JSX.Element {
  return (
    <>
      {props.product.masterVariant.availability?.availableQuantity ? (
        <span className="number-pcs">
          {props.product.masterVariant.availability?.availableQuantity} pcs
        </span>
      ) : (
        <span className="number-pcs not-available">{'Not available'}</span>
      )}
    </>
  );
}

export default AvailableQuantity;

import React from 'react';
import ProductsList from './ProductsList';
import { ProductProjection } from '@commercetools/platform-sdk';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchProducts(props: {
  products: ProductProjection[] | null;
}): React.JSX.Element {
  return (
    <>
      {props.products!.length !== 0 ? (
        <ProductsList products={props.products!} />
      ) : (
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <p className="nothing-text">Nothing is found!</p>
        </div>
      )}
    </>
  );
}

export default SearchProducts;

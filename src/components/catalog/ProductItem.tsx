import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { Link } from 'react-router-dom';
import './catalog.css';
import { routes } from '../../modules/routes';
import BasketButton from '../basket/BasketButton';
import PriceContent from '../priceFunction/PriceContent';
import AvailableQuantity from '../quantityProduct/AvailableQuantity';

function ProductItem(props: { product: ProductProjection }): React.JSX.Element {
  const { product } = props;
  const cutDescription = (text: string) => text.split('.')[0];

  return (
    <>
      <li className="card" key={product.id}>
        <Link className="card-link" to={`${routes.catalog}/${product.id}`}>
          <div className="card-top">
            <img
              className="products-img"
              src={
                product.masterVariant.images![0].url ||
                'https://placehold.co/300x300.png?text=Without+Image'
              }
              alt={`${product.name['en-US']} image`}
              width={200}
              height={200}
            />
          </div>
          <div className="card-middle">
            <h3 className="products-header">{product.name['en-US']}</h3>
            <PriceContent product={product} />
            <p className="products-description">
              {cutDescription(product.description!['en-US'])}
            </p>
          </div>
          <AvailableQuantity product={product} />
        </Link>
        <BasketButton product={product} />
      </li>
    </>
  );
}

export default ProductItem;

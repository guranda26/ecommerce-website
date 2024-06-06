import { ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './catalog.css';
import { getPrice } from '../../components/priceFunction/getPrice';

function PoductsList(props: {
  products: ProductProjection[];
}): React.JSX.Element {
  const navigate = useNavigate();
  const products = props.products;

  const productClickHandle = (id: string) => {
    navigate(`/catalog/${id}`);
  };

  const cutDescription = (text: string) => text.split('.')[0];

  return (
    <>
      <p className='total'>Total Products: <span>{products.length}</span></p>
      <ul className="products-list">
        {products &&
          products.map((product) => (
            <li
              className="products-item"
              key={product.id}
              onClick={() => productClickHandle(product.id)}
            >
              <div className="products-item-top">
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
              <div className="products-item-bottom">
                <h3 className="products-header">{product.name['en-US']}</h3>
                <div className="price-content">
                  <span
                    className={
                      getPrice(product).discountPrice
                        ? 'price discount-price'
                        : 'price'
                    }
                  >
                    {getPrice(product).price}
                  </span>
                  <span className="price discount">
                    {getPrice(product).discountPrice}
                  </span>
                </div>
                <p className="products-description">
                  {cutDescription(product.description!['en-US'])}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default PoductsList;

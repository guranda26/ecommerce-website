import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './catalog.css';
import { getPrice } from '../priceFunction/getPrice';
import { routes } from '../../modules/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

function PoductsList(props: {
  products: ProductProjection[];
}): React.JSX.Element {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const navigate = useNavigate();
  const products = props.products;

  const productClickHandle = (id: string) => {
    navigate(`${routes.catalog}/${id}`);
  };

  const cutDescription = (text: string) => text.split('.')[0];

  return (
    <>
      <p className="total">
        Total Products: <span>{products.length}</span>
      </p>
      <ul className="products-list">
        {products &&
          products.map((product) => (
            <li
              className="card"
              key={product.id}
              onClick={() => productClickHandle(product.id)}
            >
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
              <div className="footer-card">
                {product.masterVariant.availability?.availableQuantity ?
                  <span className='number-pcs'>{product.masterVariant.availability?.availableQuantity} pcs</span> :
                  <span className='number-pcs not-available'>{'Not available'}</span>}
                <button className={
                  (product.masterVariant.availability?.availableQuantity && !disabledBtn) ?
                    'bucket-btn' :
                    'bucket-btn disabled'
                }><FontAwesomeIcon className='bucket-image' icon={faCartPlus} /></button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default PoductsList;

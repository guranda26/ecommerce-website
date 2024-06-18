import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import './basket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faCartShopping,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  addToBasket,
  deleteProductInCard,
  isExistProductMyCart,
} from '../../../sdk/basketApi';

function BasketButton(props: {
  product: ProductProjection;
}): React.JSX.Element {
  const [number, setNumber] = useState(1);
  const product = props.product;
  const [isDisabled, setDisabled] = useState(isExistProductMyCart(product.id));

  const handleBasket = async (product: ProductProjection) => {
    const isAdded = await addToBasket(product, number);
    setDisabled(true);
    console.log('Is Add Product:', isAdded);
  };

  const deleteProduct = async (product: ProductProjection) => {
    const deleteProduct = await deleteProductInCard(product);
    if (deleteProduct) setDisabled(false);
  };

  return (
    <>
      <div className="basket">
        {product.masterVariant.availability?.availableQuantity &&
        !isDisabled ? (
          <div className="basket-wrap">
            <div className="num-wrap">
              <button
                className="num-btn"
                title={`Remove one pcs ${product.name['en-US']}`}
                onClick={() =>
                  setNumber((prev) => {
                    if (prev > 1) return prev - 1;
                    return prev;
                  })
                }
              >
                {<FontAwesomeIcon className="num-image" icon={faMinus} />}
              </button>
              <p className="num">{number}</p>
              <button
                className="num-btn"
                title={`Add one pcs ${product.name['en-US']}`}
                onClick={() =>
                  setNumber((prev) => {
                    if (
                      product.masterVariant?.availability?.availableQuantity &&
                      prev <
                        product.masterVariant?.availability?.availableQuantity
                    )
                      return prev + 1;
                    return prev;
                  })
                }
              >
                {<FontAwesomeIcon className="num-image" icon={faPlus} />}
              </button>
            </div>
            <button
              className="basket-btn"
              title={`Add ${number} pcs ${product.name['en-US']} to basket`}
              onClick={() => void handleBasket(product)}
            >
              <FontAwesomeIcon className="basket-image" icon={faCartPlus} />
            </button>
          </div>
        ) : !product.masterVariant.availability?.availableQuantity ? (
          <button
            className="basket-btn disabled"
            title={`Cannot add ${product.name['en-US']} to basket`}
          >
            <FontAwesomeIcon className="basket-image" icon={faCartShopping} />
          </button>
        ) : (
          <button
            className="basket-btn disabled"
            title={`Remove ${number} pcs ${product.name['en-US']} from basket`}
            onClick={() => void deleteProduct(product)}
          >
            <FontAwesomeIcon className="basket-image" icon={faCartShopping} />
          </button>
        )}
      </div>
    </>
  );
}

export default BasketButton;

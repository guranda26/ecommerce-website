import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import './basket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addToBasket, isExistProductMyCart } from '../../../sdk/basketApi';

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
                                        if (product.masterVariant?.availability?.availableQuantity && (
                                            prev <
                                            product.masterVariant?.availability?.availableQuantity)
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
                            onClick={() => void handleBasket(product)}
                        >
                            <FontAwesomeIcon
                                title={`Add ${number} pcs ${product.name['en-US']} in basket`}
                                className="basket-image"
                                icon={faCartPlus}
                            />
                        </button>
                    </div>
                ) : (
                    <button className="basket-btn disabled">
                        <FontAwesomeIcon className="basket-image" icon={faCartPlus} />
                    </button>
                )}
            </div>
        </>
    );
}

export default BasketButton;

import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './catalog.css';
import { getPrice } from '../../components/priceFunction/getPrice';
import { routes } from '../../modules/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addToBasket } from '../../../sdk/basketApi';

function ProductItem(props: {
    product: ProductProjection;
}): React.JSX.Element {
    const [number, setNumber] = useState(1);
    const [isDisabled, setDisabled] = useState(false);
    const product = props.product;
    const cutDescription = (text: string) => text.split('.')[0];


    // TODO setDisableBTN

    const handleBasket = async (product: ProductProjection) => {
        const isAdded = await addToBasket(product, number);
        setDisabled(true);
        console.log('Is Add Product:', isAdded);
    };
    return (
        <>
            <li className="card" key={product.id}>
                <Link
                    className="card-link"
                    to={`${routes.catalog}/${product.id}`}
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
                    {product.masterVariant.availability?.availableQuantity ? (
                        <span className="number-pcs">
                            {product.masterVariant.availability?.availableQuantity} pcs
                        </span>
                    ) : (
                        <span className="number-pcs not-available">
                            {'Not available'}
                        </span>
                    )}
                </Link>
                <div className="footer-card">
                    {(product.masterVariant.availability?.availableQuantity && !isDisabled) ? (
                        <div className='basket-wrap'>
                            <div className='num-wrap'>
                                <button className='num-btn' onClick={() => setNumber((prev) => {
                                    if (prev > 1) return prev - 1;
                                    return prev;
                                })}>{<FontAwesomeIcon
                                    icon={faMinus}
                                />}</button>
                                <p>{number}</p>
                                <button className='num-btn' onClick={() => setNumber((prev) => {
                                    if (prev < product.masterVariant.availability?.availableQuantity!) return prev + 1;
                                    return prev;

                                })}>{<FontAwesomeIcon
                                    icon={faPlus}
                                />}</button>
                            </div>
                            <button
                                className="bucket-btn"
                                onClick={() => void handleBasket(product)}
                            >
                                <FontAwesomeIcon
                                    className="bucket-image"
                                    icon={faCartPlus}
                                />
                            </button>
                        </div>
                    ) : (
                        <button className="bucket-btn disabled">
                            <FontAwesomeIcon
                                className="bucket-image"
                                icon={faCartPlus}
                            />
                        </button>
                    )}
                </div>
            </li>
        </>);
}

export default ProductItem;

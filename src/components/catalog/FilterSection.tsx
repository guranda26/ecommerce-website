import React, { useRef, useState } from 'react';
import './filterSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {
  getProductsByName,
  multipleFilterProducts,
  sortProductByPrice,
} from '../../../sdk/productsApi';
import { ProductProjection } from '@commercetools/platform-sdk';

function FilterSection(props: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const selectRef = useRef<HTMLSelectElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const lowPriceInputRef = useRef<HTMLInputElement | null>(null);
  const highPriceInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchName = (text: string) => {
    let products;
    void (async () => {
      setLoading(true);
      products = await getProductsByName(text);
      props.setProducts([...products]);
      setLoading(false);
    })();
  };

  const handleSortByPrice = (type: string) => {
    let products;
    void (async () => {
      setLoading(true);
      products = await sortProductByPrice(type);
      props.setProducts(products?.body.results || []);
      setLoading(false);
    })();
  };

  const handleFilter = () => {
    let products;
    const filterValue = {
      color: selectRef.current?.value,
      lowPrice: parseFloat(lowPriceInputRef.current?.value!) * 100,
      highPrice: parseFloat(highPriceInputRef.current?.value!) * 100,
      discount: checkboxRef.current?.checked,
    };

    void (async () => {
      setLoading(true);
      products = await multipleFilterProducts(filterValue);
      props.setProducts(products?.body.results || []);
      setLoading(false);
    })();
  };

  return (
    <form>
      <div className="filter-section">
        <label className="name-label" htmlFor="product-name">
          <FontAwesomeIcon className="search-img" icon={faMagnifyingGlass} />
          <input
            className="filter-name"
            onChange={(event) => handleSearchName(event.target.value)}
            type="text"
            name="name"
            id="product-name"
            autoComplete="on"
            placeholder="Product Name"
          />
        </label>
        <select
          onChange={(event) => handleSortByPrice(event.target.value)}
          className="select-price"
          name="price"
          id="price"
        >
          <option style={{ display: 'none' }} defaultValue={''}>
            Select Price By
          </option>
          <option value={'asc'}>Ascending price</option>
          <option value={'desc'}>Descending price</option>
        </select>
        <fieldset className="filter-content">
          <legend>Filter</legend>

          <label className="discount-label" htmlFor="discount">
            Discount:
            <input
              ref={checkboxRef}
              type="checkbox"
              name="discount"
              id="discout"
            />
          </label>
          <div className="price-wrapper">
            <span className="price-text">Prices:</span>
            <input
              ref={lowPriceInputRef}
              name="lowPrice"
              type="number"
              placeholder="Price(euro)"
            />
            <input
              ref={highPriceInputRef}
              name="highPrice"
              type="number"
              placeholder="Price(euro)"
            />
          </div>
          <select
            name="color"
            id="color"
            ref={selectRef}
            onChange={(e) => {
              e.target.style.backgroundColor = e.target.value;
            }}
          >
            <option defaultValue={''}>Choose color</option>
            <option style={{ backgroundColor: '#F5F5DC' }} value="#F5F5DC">
              Beige
            </option>
            <option style={{ backgroundColor: '#FFF' }} value="#FFF">
              White
            </option>
            <option style={{ backgroundColor: '#D2B48C' }} value="#D2B48C">
              Tan
            </option>
            <option style={{ backgroundColor: '#808080' }} value="#808080">
              Gray
            </option>
            <option style={{ backgroundColor: '#0000FF' }} value="#0000FF">
              Blue
            </option>
            <option style={{ backgroundColor: '#C0C0C0' }} value="#C0C0C0">
              Silver
            </option>
            <option style={{ backgroundColor: '#964B00' }} value="#964B00">
              Dark Brown
            </option>
            <option
              style={{ backgroundColor: '#000', color: '#fff' }}
              value="#000"
            >
              Black
            </option>
            <option style={{ backgroundColor: '#00FF00' }} value="#00FF00">
              Green
            </option>
          </select>

          <button
            className="button filter-btn"
            type="button"
            onClick={handleFilter}
          >
            Filter
          </button>
        </fieldset>
      </div>

      {loading && <div className="loading-text">Loading...</div>}
    </form>
  );
}

export default FilterSection;

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './filterSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {
  getProductsByName,
  multipleFilterProducts,
  sortProductByPrice,
} from '../../../sdk/productsApi';
import { useDebounce } from 'use-debounce';
import { UserContext } from '../../context/userContext';
import { colors } from '../../modules/colors';
import { ProductsInterface } from '../../Interfaces/productsInterface';

function FilterSection(props: ProductsInterface): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debounceValue] = useDebounce(searchText, 500);
  const { setProducts } = props;

  const selectRef = useRef<HTMLSelectElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const lowPriceInputRef = useRef<HTMLInputElement | null>(null);
  const highPriceInputRef = useRef<HTMLInputElement | null>(null);
  const { apiRoot } = useContext(UserContext);

  const handleSearchName = (text: string) => {
    if (text) setSearchText(text);
  };

  const searchName = useCallback(async () => {
    if (debounceValue) {
      setLoading(true);
      const products = await getProductsByName(debounceValue, apiRoot!);
      setProducts([...products]);
      setLoading(false);
    }
  }, [debounceValue, apiRoot, setProducts]);

  useEffect(() => {
    void searchName();
  }, [searchName]);

  const handleSortByPrice = (type: string) => {
    let products;
    void (async () => {
      setLoading(true);
      products = await sortProductByPrice(type, apiRoot!);
      setProducts(products?.body.results || []);
      setLoading(false);
    })();
  };

  const handleFilter = () => {
    let products;
    const lowPrice = lowPriceInputRef.current?.value
      ? parseFloat(lowPriceInputRef.current?.value) * 100
      : undefined;
    const highPrice = highPriceInputRef.current?.value
      ? parseFloat(highPriceInputRef.current?.value) * 100
      : undefined;
    const filterValue = {
      color: selectRef.current?.value,
      lowPrice: lowPrice,
      highPrice: highPrice,
      discount: checkboxRef.current?.checked,
    };

    void (async () => {
      setLoading(true);
      products = await multipleFilterProducts(filterValue, apiRoot!);
      setProducts(products?.body.results || []);
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
              id="discount"
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
            {colors.map((color, index) => (
              <option
                style={{ backgroundColor: color.hex }}
                key={index}
                value={color.hex}
              >
                {color.name}
              </option>
            ))}
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

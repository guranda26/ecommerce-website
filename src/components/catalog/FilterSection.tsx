import React, { useState } from 'react';
import './filterSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { getProductsByName } from '../../../sdk/productsApi';
import { ProductProjection } from '@commercetools/platform-sdk';

function FilterSection(props: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProjection[] | null>>;
}): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleSearchName = (text: string) => {
    let products;
    void (async () => {
      setLoading(true);
      products = await getProductsByName(text);
      props.setProducts([...products]);
      setLoading(false);
    })();
  };

  return (
    <>
      <div className="filter-section">
        <label className="name-label" htmlFor="product-name">
          <FontAwesomeIcon className="search-img" icon={faMagnifyingGlass} />
          <input
            className="filter-name"
            onChange={(event) => handleSearchName(event.target.value)}
            type="text"
            name="name"
            id="product-name"
          />
        </label>
        <select className="select-price" name="price" id="price">
          <option style={{ display: 'none' }} defaultValue={''}>
            Select Price By
          </option>
          <option value={'asc'}>Ascending price</option>
          <option value={'desc'}>Descending price</option>
        </select>
        {/* <div className="filter-content">
                <select name='color' id='color'>

                </select>
            </div> */}
      </div>
      {loading && <div className="loading-text">Loading...</div>}
    </>
  );
}

export default FilterSection;

import React, { useState } from 'react';
import LoadProducts from './LoadProducts';
import './catalog.css';
import FilterSection from '../../components/catalog/FilterSection';
import { ProductProjection } from '@commercetools/platform-sdk';
import SearchProducts from './SearchProducts';
import Categories from './Categories';

function Catalog(): React.JSX.Element {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);
  return (
    <div className="catalog-wrapper">
      <aside className="sidebar">
        <Categories />
      </aside>
      <section className="catalog">
        <h2 className="section-header">Our catalog</h2>
        <FilterSection setProducts={setProducts} />
        {!products ? <LoadProducts /> : <SearchProducts products={products} />}
      </section>
    </div>
  );
}

export default Catalog;

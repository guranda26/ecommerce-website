import React from 'react';
import LoadProducts from './LoadProducts';
import './catalog.css';

function Catalog(): React.JSX.Element {
  return (
    <>
      <h2 className="section-header">Our catalog</h2>
      <LoadProducts />
    </>
  );
}

export default Catalog;

import React from 'react';
import { Link } from 'react-router-dom';
import './collection.css';
import table from '../../assets/images/table.png';
import poufic from '../../assets/images/poufic.png';
import lamp from '../../assets/images/lamp.png';

function Collection(): React.JSX.Element {
  return (
    <section className="collection">
      <h2 className="section-header">Inspiration Collection</h2>
      <p className="section-text collection-text">
        We provide the finest in luxury home décor. You will find the highest
        quality products available in our showroom. And there is nothing like
        our range for size or details, whether you require lighting, furniture,
        wall décor, or home accessories.
      </p>
      <div className="collection-images">
        <Link className="collection-link" to="/products">
          <img src={table} alt="" width={355} height={434} />
        </Link>
        <Link className="collection-link" to="/products">
          <img src={poufic} alt="" width={355} height={434} />
        </Link>
        <Link className="collection-link" to="/products">
          <img src={lamp} alt="" width={355} height={434} />
        </Link>
      </div>
    </section>
  );
}

export default Collection;

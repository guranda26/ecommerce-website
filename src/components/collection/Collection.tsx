import React from 'react';
import { Link } from 'react-router-dom';
import './collection.css';
import table from '../../assets/images/table.png';
import poufic from '../../assets/images/poufic.png';
import lamp from '../../assets/images/lamp.png';
import { routes } from '../../modules/routes';

function Collection(): React.JSX.Element {
  return (
    <section className="collection">
      <h2 className="section-header">Inspiration Collection</h2>
      <p className="section-text collection-text">
        We provide the finest in luxury home décor. You will find the highest
        quality products available in ourshowroom. And there is nothing like our
        range for size or details, whether you require lighting, furniture, wall
        décor, or home accessories.
      </p>
      <div className="collection-images">
        <Link className="collection-link" to={routes.catalog}>
          <img src={table} alt="Table image" width={355} height={434} />
        </Link>
        <Link className="collection-link" to={routes.catalog}>
          <img src={poufic} alt="Chair image" width={355} height={434} />
        </Link>
        <Link className="collection-link" to={routes.catalog}>
          <img src={lamp} alt="Lamp image" width={355} height={434} />
        </Link>
      </div>
    </section>
  );
}

export default Collection;

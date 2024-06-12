import React from 'react';
import { Link } from 'react-router-dom';
import './features.css';
import { routes } from '../../modules/routes';

function Features(): React.JSX.Element {
  return (
    <section className="features">
      <div className="content">
        <h2 className="content-header">New Arrival</h2>
        <p className="content-text__bold">Discover Our New Collection </p>
        <p className="section-text content-text">
          Buying new furniture allows you to create your own unique style and
          ambiance in your home, whether you prefer a modern, minimalist,
          rustic, or eclectic look. You can also mix and match different pieces
          of furniture to create a harmonious and cohesive theme in your home.
        </p>
        <div>
          <Link className="button" to={routes.catalog}>
            Buy now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;

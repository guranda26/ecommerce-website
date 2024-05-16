import React from 'react';
import { Link } from 'react-router-dom';
import './beutifyYourSpace.css';

function BeutifyYourSpace(): React.JSX.Element {
  return (
    <section className="beutifyYourSpace">
      <div className="beutifyYourSpace-content">
        <h2 className="section-header">Beautify Your Space</h2>
        <p className="beutifyYourSpace-text">
          Home is where the heart is, and the heart often desires beauty,
          comfort, and a reflection of personal style. In the realm of home
          decor and furniture, choices are abundant, ranging from
          budget-friendly options to high-end luxury items. The decision-making
          process can be complex, as it involves balancing practicality,
          affordability, aesthetics, and quality.
        </p>
        <Link className="button" to="/products">
          Learn more
        </Link>
      </div>
      <div className="beutifyYourSpace-image"></div>
    </section>
  );
}

export default BeutifyYourSpace;

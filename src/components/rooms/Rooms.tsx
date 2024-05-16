import React from 'react';
import './rooms.css';
import { Link } from 'react-router-dom';

function Rooms(): React.JSX.Element {
  return (
    <section className="section rooms">
      <h2 className="section-header">Browse The Range</h2>
      <p className="section-text">
        The latest in contemporary, modern, and classic style are available in
        our showroom, In addition to the best living room sets, dining room
        sets, bedroom sets, reception sets, lighting, outdoor furniture, and
        more, our carefully chosen collection of luxury home décor features over
        500 products
      </p>
      <ul className="rooms-lists">
        <li className="rooms-item">
          <Link className="rooms-link" to="/catalog">
            Dining
          </Link>
        </li>
        <li className="rooms-item">
          <Link className="rooms-link" to="/catalog">
            Living
          </Link>
        </li>
        <li className="rooms-item">
          <Link className="rooms-link" to="/catalog">
            Bedroom
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Rooms;

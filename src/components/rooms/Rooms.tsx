import React from 'react';
import './rooms.css';
import { Link } from 'react-router-dom';
import { routes } from '../../modules/routes';

function Rooms(): React.JSX.Element {
  const rooms = [
    {
      room: 'Dining',
      path: routes.catalog,
    },
    {
      room: 'Living',
      path: routes.catalog,
    },
    {
      room: 'Bedroom',
      path: routes.catalog,
    },
  ];

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
        {rooms.map((element, index) => (
          <li className="rooms-item" key={index}>
            <Link
              className={`rooms-link ${element.room.toLowerCase()}`}
              to={element.path}
            >
              {element.room}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Rooms;

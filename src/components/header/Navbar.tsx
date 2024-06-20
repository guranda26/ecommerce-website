import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faHouse,
  faMagnifyingGlass,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../modules/routes';
import ProductNumber from './ProductNumber';

function Navbar(props: { handleBurgerBtn: VoidFunction }): React.JSX.Element {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            title="Home"
            className="nav-link"
            to={routes.home}
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            title="Catalog"
            className="nav-link"
            to={routes.catalog}
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faBook} /> Catalog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            title="About us"
            className="nav-link"
            to={routes.about}
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            About us
          </NavLink>
        </li>
        <li className="nav-item basket-item-link">
          <ProductNumber />
          <NavLink
            title="Basket"
            className="nav-link"
            to={routes.basket}
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

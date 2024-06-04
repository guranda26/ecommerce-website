import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faHouse,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

function Navbar(props: { handleBurgerBtn: VoidFunction }): React.JSX.Element {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            title="Home"
            className="nav-link"
            to="/"
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
            to="/catalog"
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faBook} /> Catalog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            title="Products"
            className="nav-link"
            to="/products"
            onClick={props.handleBurgerBtn}
          >
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            title="About us"
            className="nav-link"
            to="/about"
            onClick={props.handleBurgerBtn}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

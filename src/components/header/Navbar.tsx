import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

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
            Catalog
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
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

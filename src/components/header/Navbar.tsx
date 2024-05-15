import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function Navbar(): React.JSX.Element {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink title="Home" className="nav-link" to="/main">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink title="Catalog" className="nav-link" to="/main/catalog">
            Catalog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink title="Products" className="nav-link" to="/main/products">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink title="About us" className="nav-link" to="/main/about">
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

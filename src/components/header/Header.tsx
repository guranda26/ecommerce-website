import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import './header.css';
import Profile from './Profile';

function Header(): React.JSX.Element {
  return (
    <header className="header">
      <NavLink title="Home Page" className="logo-link" to="/">
        <img
          className="logo-img"
          src={logo}
          alt="Site logo"
          width={150}
          height={100}
        />
      </NavLink>
      <Navbar />
      <Profile />
    </header>
  );
}

export default Header;

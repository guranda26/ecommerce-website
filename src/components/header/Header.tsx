import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { NavLink, useParams } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import './header.css';
import Profile from './Profile';

function Header(): React.JSX.Element {
  const [openNav, setOpenNav] = useState(true);
  const headerRef = useRef(null);
  const param = useParams();

  const handleBurgerBtn = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    setOpenNav(!openNav);
  }, [param]);

  return (
    <header ref={headerRef} className={openNav ? 'header' : 'header active'}>
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
      <div className="burger-btn" onClick={handleBurgerBtn}></div>
    </header>
  );
}

export default Header;

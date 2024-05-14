import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import './header.css';
import Profile from './Profile';
import ProfilePanel from './ProfilePanel';

function Header(): React.JSX.Element {
  return (
    <header className='header'>
      <NavLink className='logo-link' to='/main'>
        <img className='logo-img' src={logo} alt="Site logo" width={100} height={69} />
      </NavLink>
      <Navbar />
      <Profile />
      <ProfilePanel/>
    </header>
  )
}

export default Header

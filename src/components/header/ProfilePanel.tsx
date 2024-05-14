import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function ProfilePanel(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(false);
  }

  useEffect(() => {
  }, [isLogin]);

  return (
    <>
      {!isLogin && <NavLink to="/login">Login</NavLink>}
      {!isLogin && <NavLink to="/register">Register</NavLink>}
      {isLogin && <NavLink to="/profile">Profile</NavLink>}
      {isLogin && <button type='button' onClick={handleLogin}>Log out</button>}
    </>
  )
}

export default ProfilePanel

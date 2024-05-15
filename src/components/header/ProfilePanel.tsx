import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function ProfilePanel(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(false);
  };

  useEffect(() => {}, [isLogin]);

  return (
    <>
      <h3 className="profile-header">Profile</h3>
      {!isLogin && (
        <NavLink className="profile-link" to="/login">
          Login
        </NavLink>
      )}
      {!isLogin && (
        <NavLink className="profile-link" to="/register">
          Register
        </NavLink>
      )}
      {isLogin && (
        <NavLink className="profile-link" to="/profile">
          My profile
        </NavLink>
      )}
      {isLogin && (
        <button
          className="profile-link profile-button"
          type="button"
          onClick={handleLogin}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default ProfilePanel;

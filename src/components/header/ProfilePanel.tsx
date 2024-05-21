import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const token: string | null = localStorage.getItem('token');
  const [isLogin, setIsLogin] = useState(!!token);

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
  };

  return (
    <>
      <h3 className="profile-header">Profile</h3>
      {!isLogin && (
        <NavLink
          className="profile-link"
          to="/login"
          onClick={props.handleProfile}
        >
          Login
        </NavLink>
      )}
      {!isLogin && (
        <NavLink
          className="profile-link"
          to="/register"
          onClick={props.handleProfile}
        >
          Register
        </NavLink>
      )}
      {isLogin && (
        <NavLink
          className="profile-link"
          to="/profile"
          onClick={props.handleProfile}
        >
          My profile
        </NavLink>
      )}
      {isLogin && (
        <button
          className="profile-link profile-button"
          type="button"
          onClick={logOut}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default ProfilePanel;

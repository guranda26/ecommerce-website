import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(false);
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
          onClick={handleLogin}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default ProfilePanel;

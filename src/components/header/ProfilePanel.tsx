import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const userId: string | null = localStorage.getItem('userId');
  const [isLogin, setIsLogin] = useState(!!userId);
  const navigate = useNavigate();

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
      <h3 className="profile-header">Profile</h3>
      {!isLogin && (
        <>
          <NavLink
            className="profile-link"
            to="/login"
            onClick={props.handleProfile}
          >
            Login
          </NavLink>
          <NavLink
            className="profile-link"
            to="/register"
            onClick={props.handleProfile}
          >
            Register
          </NavLink>
        </>
      )}
      {isLogin && (
        <>
          <NavLink
            className="profile-link"
            to="/profile"
            onClick={props.handleProfile}
          >
            My profile
          </NavLink>
          <button
            className="profile-link profile-button"
            type="button"
            onClick={logOut}
          >
            Log out
          </button>
        </>
      )}
    </>
  );
}

export default ProfilePanel;

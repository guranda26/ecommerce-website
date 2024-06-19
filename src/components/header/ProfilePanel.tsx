import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './header.css';
import { isExist } from '../../../sdk/myToken';
import { routes } from '../../modules/routes';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(isExist());
  const navigate = useNavigate();

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem('myCache');
    navigate(routes.home);
    window.location.reload();
  };

  return (
    <>
      <h3 className="profile-header">Profile</h3>
      {!isLogin && (
        <>
          <NavLink
            className="profile-link"
            to={routes.login}
            onClick={props.handleProfile}
          >
            Login
          </NavLink>
          <NavLink
            className="profile-link"
            to={routes.register}
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
            to={routes.profile}
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

import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { getMyToken, isExist } from '../../../sdk/myToken';
import { UserContext } from '../../context/userContext';
import { clientMaker } from '../../../sdk/createClient';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(isExist());
  const userContext = useContext(UserContext);

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem('myCache');
    getMyToken(true);
    userContext.apiRoot = clientMaker();
    
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

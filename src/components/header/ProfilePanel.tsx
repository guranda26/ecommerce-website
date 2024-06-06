import { NavLink, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import './header.css';
import { getMyToken, isExist } from '../../../sdk/myToken';
import { UserContext } from '../../context/userContext';
import { clientMaker } from '../../../sdk/createClient';

function ProfilePanel(props: {
  handleProfile: VoidFunction;
}): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(isExist());
  const { setApiRoot } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem('myCache');
    const newApiRoot = clientMaker();
    setApiRoot(newApiRoot);
    getMyToken();
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

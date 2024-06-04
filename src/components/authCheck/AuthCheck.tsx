import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isExist } from '../../../sdk/myToken';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const isUserExist = isExist();
  React.useEffect(() => {
    if (isUserExist) {
      navigate('/?message=You are already logged in.');
    }
  }, [navigate, isUserExist]);

  return <>{!isUserExist && children}</>;
};

export default AuthCheck;

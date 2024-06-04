import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isExist } from 'sdk/myToken';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const isLogin = isExist();
  React.useEffect(() => {
    if (isLogin) {
      alert('You are already logged in.');
      navigate('/');
    }
  }, [navigate, isLogin]);

  return <>{!isLogin && children}</>;
};

export default AuthCheck;

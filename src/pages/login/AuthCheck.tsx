import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    if (userId) {
      alert('You are already logged in.');
      navigate('/');
    }
  }, [navigate, userId]);

  return <>{!userId && children}</>;
};

export default AuthCheck;

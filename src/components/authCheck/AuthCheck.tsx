import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../Toast/Toast';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      if (location.pathname === '/login') {
        setToastMessage('You are already logged in.');
        navigate('/', { replace: true });
      }
      setIsAuthChecked(true);
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate, userId, location.pathname]);

  const handleCloseToast = () => {
    setToastMessage('');
  };

  if (!isAuthChecked && location.pathname !== '/login') {
    return null;
  }

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
      {children}
    </>
  );

};

export default AuthCheck;
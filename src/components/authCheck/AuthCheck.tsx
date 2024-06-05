import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isExist } from '../../../sdk/myToken';

interface AuthCheckProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  restricted = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isUserExist = isExist();

  useEffect(() => {
    if (isUserExist) {
      setIsAuthChecked(true);
    } else {
      setIsAuthChecked(true);
      if (restricted && location.pathname !== '/login') {
        const toastMessage = 'You need to be logged in to access this page.';
        toast.info(toastMessage, { autoClose: 3000 });
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, isUserExist, restricted, location.pathname]);

  useEffect(() => {
    if (isUserExist && location.pathname === '/login') {
      const toastMessage = 'You are already logged in.';
      toast.info(toastMessage, { autoClose: 3000 });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [navigate, isUserExist, location.pathname]);

  if (!isAuthChecked) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;

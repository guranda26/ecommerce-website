import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BeutifyYourSpace from '../../components/beutifyYourSpace/BeutifyYourSpace';
import Collection from '../../components/collection/Collection';
import Features from '../../components/features/Features';
import HowItWorks from '../../components/howItWorks/HowItWorks';
import Rooms from '../../components/rooms/Rooms';
import Support from '../../components/services/Services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const loginRedirectMessage = searchParams.get('message');

    if (loginRedirectMessage) {
      toast.info(loginRedirectMessage, { autoClose: 5000 });
      setTimeout(() => {
        searchParams.delete('message');
        navigate({ search: searchParams.toString() }, { replace: true });
      }, 1000);
    }
  }, [location, navigate]);

  return (
    <>
      <ToastContainer />
      <Features />
      <Support />
      <Collection />
      <BeutifyYourSpace />
      <Rooms />
      <HowItWorks />
    </>
  );
}

export default MainPage;

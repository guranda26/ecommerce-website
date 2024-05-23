import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BeutifyYourSpace from '../../components/beutifyYourSpace/BeutifyYourSpace';
import Collection from '../../components/collection/Collection';
import Features from '../../components/features/Features';
import HowItWorks from '../../components/howItWorks/HowItWorks';
import Rooms from '../../components/rooms/Rooms';
import Support from '../../components/services/Services';

function MainPage(): React.JSX.Element {
  const [message, setMessage] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const loginRedirectMessage = searchParams.get('message');
    if (loginRedirectMessage) {
      setMessage(loginRedirectMessage);
      // Clear the message parameter from the URL after displaying it
      searchParams.delete('message');
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      {message && <div className="alert-msg">{message}</div>}
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

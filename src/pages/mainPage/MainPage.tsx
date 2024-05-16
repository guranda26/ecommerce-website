import React from 'react';
import BeutifyYourSpace from '../../components/beutifyYourSpace/BeutifyYourSpace';
import Collection from '../../components/collection/Collection';
import Features from '../../components/features/Features';
import Rooms from '../../components/rooms/Rooms';
import Support from '../../components/services/Services';

function MainPage(): React.JSX.Element {
  return (
    <>
      <Features />
      <Support />
      <Collection />
      <BeutifyYourSpace />
      <Rooms />
    </>
  );
}

export default MainPage;

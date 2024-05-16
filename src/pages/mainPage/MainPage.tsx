import React from 'react';
import BeutifyYourSpace from '../../components/beutifyYourSpace/BeutifyYourSpace';
import Collection from '../../components/collection/Collection';
import Features from '../../components/features/Features';
import Support from '../../components/services/Services';

function MainPage(): React.JSX.Element {
  return (
    <>
      <Features />
      <Support />
      <Collection />
      <BeutifyYourSpace />
    </>
  );
}

export default MainPage;

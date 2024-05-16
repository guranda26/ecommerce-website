import React from 'react';
import Collection from '../../components/collection/Collection';
import Features from '../../components/features/Features';
import Support from '../../components/services/Services';

function MainPage(): React.JSX.Element {
  return (
    <>
      <Features />
      <Support />
      <Collection />
    </>
  );
}

export default MainPage;

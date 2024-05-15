import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

function MainPageLayout(): React.JSX.Element {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default MainPageLayout;

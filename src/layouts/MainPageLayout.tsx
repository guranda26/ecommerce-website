import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import './mainPageLayout.css';
import ScrollToTop from '../components/ScrollToTop/ScrollTop';

function MainPageLayout(): React.JSX.Element {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainPageLayout;

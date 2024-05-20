import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPageLayout from './layouts/MainPageLayout';
import RootLayout from './layouts/RootLayout';
import Catalog from './pages/catalog/Catalog';
import ErrorPage from './pages/errorPage/ErrorPage';
import Login from './pages/login/Login';
import MainPage from './pages/mainPage/MainPage';
import './App.css';
import RegistrationForm from './pages/register/Register';
import Products from './pages/products/Products';
import About from './pages/about/About';

const App: React.FC = () => {
  const roots = createBrowserRouter([
    {
      path: '/',
      element: <MainPageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: 'catalog',
          element: <Catalog />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    {
      path: '/login',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
    {
      path: '/register',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <RegistrationForm />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={roots} />
    </>
  );
};

export default App;

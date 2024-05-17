import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPageLayout from './layouts/MainPageLayout';
import RootLayout from './layouts/RootLayout';
import Catalog from './pages/catalog/Catalog';
import ErrorPage from './pages/errorPage/ErrorPage';
import Login from './pages/login/Login';
import MainPage from './pages/mainPage/MainPage';
import Register from './pages/register/Register';
import './App.css';
import RegistrationForm from './pages/register/Register';


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
      <RegistrationForm />
    </>
  );
};

export default App;

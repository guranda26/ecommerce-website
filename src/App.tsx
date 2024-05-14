import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import MainPageLayout from './layouts/MainPageLayout'
import RootLayout from './layouts/RootLayout';
// import Catalog from './pages/catalog/Catalog'
// import ErrorPage from './pages/errorPage/ErrorPage'
import Login from './pages/login/Login';
// import MainPage from './pages/mainPage/MainPage'
import Register from './pages/register/Register';
import './App.css';

const App: React.FC = () => {
  const roots = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      // errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        // {
        //   path: 'main',
        //   element: <MainPageLayout />,
        //   children: [
        //     {
        //       index: true,
        //       element: <MainPage />
        //     },
        //     {
        //       path: 'catalog',
        //       element: <Catalog />
        //     },
        //   ]
        // }
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

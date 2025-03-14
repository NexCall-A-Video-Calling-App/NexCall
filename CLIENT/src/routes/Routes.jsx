import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomeLayout from '../layouts/HomeLayout';
import ErrorPage from '../pages/errorPage/ErrorPage';

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      }
    ]
  },
]);

export default Routes;
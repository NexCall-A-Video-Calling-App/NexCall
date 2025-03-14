import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomeLayout from '../layouts/HomeLayout';
import ErrorPage from '../pages/errorPage/ErrorPage';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path:"/signUp",
        element: <SignUp/>
      },
      {
        path:"/signIn",
        element: <SignIn/>
      },
      {
        path:"/dashboard",
        element: <Dashboard/>
      }
    ]
  },
]);

export default Routes;
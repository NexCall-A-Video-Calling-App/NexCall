import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Products from '../pages/Products/Products';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/Error';

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: 'product',
            element:<Products />
        }
      ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
  ]);

export default Router;
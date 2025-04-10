import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfileDetails from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../pages/Profile/EditProfile";
import MeetingLayoutes from "../pages/Meeting/MeetingLayouts/MeetingLayoutes";
import MeetingNavbar from "../pages/Meeting/MeetingNavbar/MeetingNavbar";
import MeetingFunctionpage from "../pages/Meeting/MeetingFunctionPages/MeetingFunctionpage";
import ChatHistory from "../pages/ChatHistory/ChatHistory";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

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
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element:<ForgotPassword></ForgotPassword>,
      },
      {
        path: "/userProfile",
        element: <PrivateRoute>
          <ProfileDetails />
        </PrivateRoute>
      },
      // {
      //   path: "/editProfile",
      //   element: <PrivateRoute>
      //     <EditProfile />
      //   </PrivateRoute>
      // },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
    ],
  },
  {
    path: '/meeting',
    element: <MeetingLayoutes></MeetingLayoutes>,
    children: [
      {
        path: '/meeting',
        element: <MeetingFunctionpage />
      },
      {
        path: '/meeting/chat-history',
        element: <ChatHistory />
      }
    ]
  }
]);

export default Routes;

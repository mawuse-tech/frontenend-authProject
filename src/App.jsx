
import React from 'react'
import RootLayout from '../layout/rootLayout';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import { useContext } from 'react';
import { AuthContext } from './contex/AuthContex';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';

function PrivateRoute({ children }) {
  const { currentUser, loading } = useContext(AuthContext);
  // console.log("-----user", user)

  if (loading) return <p>Loading...</p>
  return currentUser ? children : <Navigate to={'/'} replace />
}

function PublicRoute({ children }) {
  const { currentUser, loading } = useContext(AuthContext);
  // console.log("-----user", user)

  if (loading) return <p>Loading...</p>
  return !currentUser ? children : <Navigate to={'/home'} replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: 'signup',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        )
      },

      {
        path: 'home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },      
    ],
  },

  {
    path: '/resetPassword/:token',
    element:  <ResetPassword />
  },

  {
    path: '/forgotPassword',
    element:  <ForgotPassword />
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
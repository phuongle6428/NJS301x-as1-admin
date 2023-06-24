import './App.css';
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Root from "./pages/root/Root.jsx";
import DashBoard from './pages/dashboard/DashBoard';
import Hotel from './pages/hotel/Hotel';
import Room from './pages/room/Room';
import AddHotel from './pages/add-hotel/AddHotel';
import AddRoom from './pages/add-room/AddRoom';
import Transaction from './pages/transaction/Transaction';
import User from './pages/user/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <DashBoard />,
        index: true
      },
      {
        element: <User />,
        path: 'user'
      },
      {
        element: <Hotel />,
        path: 'hotel'
      },
      {
        element: <Room />,
        path: 'room'
      },
      {
        element: <Transaction />,
        path: 'transaction'
      },
      {
        element: <AddHotel />,
        path: 'add/hotel'
      },
      {
        element: <AddRoom />,
        path: 'add/room'
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

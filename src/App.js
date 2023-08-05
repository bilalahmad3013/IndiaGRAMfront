
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import States from './States/states';

import Home from './Screens/Home';
import Login from './Screens/login';
import Signup from './Screens/Signup';
import Navbar from './Compontnts/Navbar';
import Settings from './Screens/Settings'
import Notification from './Screens/Notifications'
import Timeline from './Screens/Timeline'
import Profile from './Screens/Profile'
import Messages from './Screens/Messages'
import { useEffect } from 'react';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Navbar />,
      children:[
        {index:true, element:<Home/>},
        {path:"/timeline", element:<Timeline />},
        {path:"/notifications", element:<Notification />},
        {path:"/settings", element:<Settings />},
        {path:"/messages", element:<Messages />},
        {path:"/profile", element:<Profile />}
      ]
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },



  ])


  return (
    <States>
      <div>
        <RouterProvider router={router} />
      
      </div>
    </States>
  );
}

export default App;

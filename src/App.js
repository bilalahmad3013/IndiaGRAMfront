
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import States from './States/states';

import Home from './Screens/Home';
import Login from './Screens/login';
import Signup from './Screens/Signup';


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
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

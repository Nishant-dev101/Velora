import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home page";
import MainLayout from "../layouts/mainLayout";
import Favorites from "../pages/Favorites";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
          {
            index: true,
            element: <Home/>
          },
          {
            path: 'favorites',
            element: <Favorites/>
          }
        ]
    }
])
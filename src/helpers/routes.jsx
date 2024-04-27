import Movie from "../pages/Movie";
import HomeLayout from "../layout/HomeLayout";
import Favourites from "../pages/utils/Favourites";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import WatchLater from "../pages/utils/WatchLater";
export const routes = [
  {
    path: "/",
    element: <HomeLayout />,
  },

  {
    path: "/favourites",
    element: <Favourites/>,
  },

  {
    path: "/watch-later",
    element: <WatchLater/>,
  },

  {
    path: "/movie",
    element: <Movie/>
  },

  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/register",
    element: <Register/>
  }

];

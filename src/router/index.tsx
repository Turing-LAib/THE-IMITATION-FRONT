import { Navigate, RouteObject } from "react-router-dom";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import GamePage from "@/pages/game";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/game/:id",
    element: <GamePage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;

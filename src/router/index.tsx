import { RouteObject } from "react-router-dom";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
];

export default routes;

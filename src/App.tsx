import { useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
  const RouterPage = useRoutes(routes);
  return <>{RouterPage}</>;
}

export default App;

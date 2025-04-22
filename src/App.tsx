import { useRoutes } from "react-router-dom";
import routes from "./router";
import DynamicProvider from "./components/dynamic-provider";

function App() {
  const RouterPage = useRoutes(routes);
  return <DynamicProvider>{RouterPage}</DynamicProvider>;
}

export default App;

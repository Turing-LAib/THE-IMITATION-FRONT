import { useRoutes } from "react-router-dom";
import routes from "./router";
import DynamicProvider from "./components/dynamic-provider";
import { Toaster } from "sonner";

function App() {
  const RouterPage = useRoutes(routes);
  return (
    <DynamicProvider>
      <Toaster position="top-right" />
      {RouterPage}
    </DynamicProvider>
  );
}

export default App;

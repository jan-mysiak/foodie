import { BrowserRouter } from "react-router-dom";
import useInitializer from "./api/hooks/useInitializer";
import Navigation from "./components/Navigation/Navigation";
import Routes from "./components/Routes";
import { Notification } from "./components/_shared/Layout/";

function App() {
  const authError = useInitializer();

  // TODO: handle auth error

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation />
        <Routes />
      </BrowserRouter>

      <Notification />
    </div>
  );
}

export default App;

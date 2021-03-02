import { HashRouter } from "react-router-dom";
import useInitializer from "./api/hooks/useInitializer";
import Navigation from "./components/Navigation/Navigation";
import Routes from "./components/Routes";
import { Notification } from "./components/_shared/Layout/";

function App() {
  const authError = useInitializer();

  // TODO: handle auth error

  return (
    <div className="app">
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <HashRouter>
        <Navigation />
        <Routes />
      </HashRouter>

      <Notification />
    </div>
  );
}

export default App;

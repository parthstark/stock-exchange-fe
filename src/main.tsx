import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { DemoModeProvider } from "./context/DemoModeContext";
import { MarketDataProvider } from "./context/MarketDataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DemoModeProvider>
      <UserProvider>
        <MarketDataProvider>
          <App />
        </MarketDataProvider>
      </UserProvider>
    </DemoModeProvider>
  </BrowserRouter>
);

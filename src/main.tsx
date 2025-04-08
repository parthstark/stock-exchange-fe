import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DemoModeProvider } from "./context/DemoModeContext";
import { MarketDataProvider } from "./context/MarketDataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DemoModeProvider>
      <AuthProvider>
        <MarketDataProvider>
          <App />
        </MarketDataProvider>
      </AuthProvider>
    </DemoModeProvider>
  </BrowserRouter>
);

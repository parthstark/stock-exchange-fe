import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";
import Header from "./components/Header";
import Architecture from "./pages/Architecture";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <div className="font-sans">
      <Header />
      {children}
    </div>
  </ProtectedRoute>
);

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/architecture" element={<Architecture />} />

      {/* Protected Routes with persistent Header */}
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/market/:ticker"
        element={
          <ProtectedLayout>
            <Market />
          </ProtectedLayout>
        }
      />

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

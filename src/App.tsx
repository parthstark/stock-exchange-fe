import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      <Route path="/market/:name"
        element={
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

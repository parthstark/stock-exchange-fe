import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<div>Welcome to App</div>} />
    </Routes>
  );
}

export default App;

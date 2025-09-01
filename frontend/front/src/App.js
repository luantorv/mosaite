import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { AuthProvider } from './context/AuthContext';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz → Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Ruta /login → Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from "./context/ThemeContext";
//import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ruta /login → Login */}
            <Route path="/login" element={<Login />} />

            {/* Ruta raíz → Dashboard */}
            <Route path="/" element={
              //<ProtectedRoute>
                <Dashboard />
              //</ProtectedRoute>
            } />
            {/* Más rutas protegidas... */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
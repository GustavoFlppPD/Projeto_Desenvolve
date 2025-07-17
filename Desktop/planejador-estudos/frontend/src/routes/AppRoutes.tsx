import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../contexts/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

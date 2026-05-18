import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import People from "./pages/People";
import MainLayout from "./layout/MainLayout";

function ProtectedRoute({ children }) {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <div className="auth-loading">Loading session...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Navigate to="/overview" replace />} />
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/people" element={<People />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

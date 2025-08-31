import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/* Navbar only on non-landing/auth pages */}
      {!["/", "/login", "/register"].includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />
        

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer always visible */}
       {!["/", "/login", "/register"].includes(location.pathname) && <Footer />}

    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes /> {/* useLocation works inside Router */}
      </Router>
    </AuthProvider>
  );
}

export default App;

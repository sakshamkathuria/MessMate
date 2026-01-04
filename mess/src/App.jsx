import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

import AppLayout from "./components/layout/AppLayout";
import Footer from "./components/layout/Footer";

import { useAuth } from "./context/AuthContext";
import SignInModal from "./components/auth/SignInModal";
import SignUpModal from "./components/auth/SignUpModal";

import ProtectedRoute from "./components/routes/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminUpdateMenu from "./pages/admin/AdminUpdateMenu";


const App = () => {
  const { showSignIn, showSignUp } = useAuth();

  return (
    <>
      <AppLayout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />

          {/* Student */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute role="student">
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute role="student">
                <Billing />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute role="admin">
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute role="admin">
                <AdminUpdateMenu />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>

      {/* Modals */}
      {showSignIn && <SignInModal />}
      {showSignUp && <SignUpModal />}

      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
          style: {
            background: "#fff7ed",       // cream
            color: "#7c2d12",            // dark orange text
            border: "2px solid #f97316", // orange border
            padding: "16px 20px",
            minWidth: "360px",
            fontSize: "15px",
            borderRadius: "14px",
            textAlign: "center",
          },
        }}
      />
    </>
  );
};

export default App;

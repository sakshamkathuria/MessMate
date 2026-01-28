import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children, role }) => {
  const { user, setShowSignIn } = useAuth();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      if (!user) {
        toast.error("Please login first 🔐");
        setShowSignIn(true);
        toastShown.current = true;
      } else if (role && user.role !== role) {
        toast.error("You are not authorized to access this page 🚫");
        toastShown.current = true;
      }
    }
  }, [user, role, setShowSignIn]);

  // ❌ Not logged in
  if (!user) {
    // open sign-in modal (handled by AuthContext) and don't navigate to a missing route
    return null;
  }

  // ❌ Role not allowed
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;

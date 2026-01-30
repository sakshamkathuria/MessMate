import { NavLink } from "react-router-dom";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const NavbarAdmin = () => {
  const { user, logout, setShowSignIn } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 font-medium transition ${
      isActive
        ? "text-orange-500"
        : "text-gray-600 hover:text-orange-500"
    }`;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[84rem] mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="bg-orange-500 text-white rounded-lg w-10 h-10 flex items-center justify-center">
            <UtensilsCrossed size={22} />
          </div>
          <span className="text-2xl font-bold">MessMate</span>
        </NavLink>

        {/* Desktop Admin Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/attendance" className={linkClass}>
            Attendance
          </NavLink>
          <NavLink to="/admin/menu" className={linkClass}>
            Menu
          </NavLink>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Admin Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 flex flex-col gap-3">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/attendance"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Attendance
          </NavLink>

          <NavLink
            to="/admin/menu"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Menu
          </NavLink>

          <div className="pt-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-orange-500 text-white py-2 rounded-xl"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowSignIn(true);
                  setOpen(false);
                }}
                className="w-full bg-orange-500 text-white py-2 rounded-xl"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarAdmin;

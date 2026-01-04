import { NavLink } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const NavbarAdmin = () => {
  const { user, logout, setShowSignIn } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 font-medium transition ${
      isActive
        ? "text-orange-500"
        : "text-gray-600 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-gray-200/60">
      <div className="max-w-[84rem] mx-auto px-0 py-1 flex items-center justify-between">
        
        {/* Logo → Home */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={`${linkClass} flex items-center gap-2`}>
          <div className="bg-orange-500 text-white rounded-lg w-10 h-10  flex items-center justify-center">
            <UtensilsCrossed size={24} />
          </div>
          <span className="text-2xl font-bold -mt-1 block">MessMate</span>
          </NavLink>
        </div>

        {/* Admin Links */}
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

        {/* Right */}
        {user ? (
          <button
            onClick={() => {
              logout();
              toast.success("Logged out successfully");
            }}
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
    </nav>
  );
};

export default NavbarAdmin;

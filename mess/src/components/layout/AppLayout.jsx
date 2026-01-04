import { useAuth } from "../../context/AuthContext";
import NavbarAdmin from "./NavbarAdmin";
import NavbarStudent from "./NavbarStudent";

const AppLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "admin" ? (
        <NavbarAdmin />
      ) : (
        <NavbarStudent />
      )}

      {children}
    </>
  );
};

export default AppLayout;

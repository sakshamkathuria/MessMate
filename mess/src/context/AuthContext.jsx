import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const login = async (email, password) => {
    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setShowSignIn(false);
  };

  const signup = async (name, email, password) => {
    await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => logout());
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        logout();
      }
    };

    const token = localStorage.getItem("token");
    if (token && !user) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        showSignIn,
        setShowSignIn,
        showSignUp,
        setShowSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token has expired
          logout();
          navigate("/login");
        }
      } catch (e) {
        // Invalid token
        logout();
        navigate("/login");
      }
    } else {
      // No token
      navigate("/login");
    }
  }, [token]);

  const login = (token, user, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
    setToken(token);
    setUser(user);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("role"));

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
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);

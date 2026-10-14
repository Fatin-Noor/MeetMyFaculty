import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    if (!localStorage.getItem("token")) return setLoading(false);
    authApi.me().then(({ data }) => {
      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
    }).catch(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const login = ({ token, user: loggedInUser }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  const updateUser = (updatedUser) => { setUser(updatedUser); localStorage.setItem("user", JSON.stringify(updatedUser)); };
  return <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);


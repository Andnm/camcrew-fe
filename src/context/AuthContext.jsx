import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/user";
import { logout as apiLogout } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("camcrew_token");
    if (!token) {
      setReady(true);
      return;
    }
    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("camcrew_token");
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.error("Logout API error:", e);
    }
    localStorage.removeItem("camcrew_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider/>");
  return ctx;
}

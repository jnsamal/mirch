import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, login as apiLogin, logout as apiLogout, refreshAuth } from "../lib/api";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user: currentUser } = await getAuth();
        setUser(currentUser);
        setToken("authenticated"); // placeholder, actual tokens in httpOnly cookies
      } catch {
        // Not authenticated
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await apiLogin(email, password);
    setUser(loggedInUser);
    setToken("authenticated");
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
    setToken("");
  }, []);

  const value = useMemo(() => ({ token, user, isAuthed: !!user, login, logout, loading }), [token, user, login, logout, loading]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
}
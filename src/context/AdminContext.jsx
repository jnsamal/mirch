import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AdminContext = createContext(null);
const STORAGE_KEY = "mirch_admin_key";

/**
 * AdminContext — holds the shared ADMIN_KEY for the admin panel.
 * It's stored in localStorage so a refresh doesn't log you out, and
 * sent as `Authorization: Bearer <key>` on every admin API call.
 * This is the same shared-secret scheme the backend uses; replace
 * with real auth (users + JWT) before multiple staff log in.
 */
export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const login = useCallback((key) => {
    const trimmed = key.trim();
    setToken(trimmed);
    try {
      if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage unavailable — session-only auth
    }
  }, []);

  const logout = useCallback(() => {
    setToken("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({ token, isAuthed: !!token, login, logout }), [token, login, logout]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
}
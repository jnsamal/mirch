/**
 * Thin API client for the Mirch backend. Base URL comes from
 * VITE_API_URL (set to the deployed backend for production).
 * In local dev Vite proxies /api to the backend (see vite.config.js),
 * so the URL can be left unset and requests go to the same origin.
 */

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const { headers, ...rest } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include", // Include cookies for httpOnly auth
    headers: { "Content-Type": "application/json", ...headers },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // no JSON body — use the generic message
    }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

// Auth endpoints
export const getAuth = () => request("/api/auth/me");

export const login = (email, password) =>
  request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logout = () =>
  request("/api/auth/logout", { method: "POST" });

export const refreshAuth = () =>
  request("/api/auth/refresh", { method: "POST" });

// Admin endpoints (auth via httpOnly cookies)
export const getMenuItems = () => request("/api/menu");

export const createMenuItem = (payload) =>
  request("/api/menu", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateMenuItem = (id, payload) =>
  request(`/api/menu/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteMenuItem = (id) =>
  request(`/api/menu/${id}`, { method: "DELETE" });

// Uploads a menu-item image (multipart form) and returns { url }.
export const uploadImage = async (file) => {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  if (!res.ok) {
    let message = `Upload failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // no JSON body — use the generic message
    }
    throw new Error(message);
  }
  return res.json();
};

export const deleteImage = (filename) =>
  request(`/api/uploads/${encodeURIComponent(filename)}`, {
    method: "DELETE",
  });

export const getOrders = (status) =>
  request(`/api/orders${status ? `?status=${encodeURIComponent(status)}` : ""}`);

export const updateOrderStatus = (id, status) =>
  request(`/api/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getPendingReviews = () => request("/api/reviews/pending");

export const approveReview = (id) =>
  request(`/api/reviews/${id}/approve`, { method: "PATCH" });

export const deleteReview = (id) =>
  request(`/api/reviews/${id}`, { method: "DELETE" });

export const getMenu = () => request("/api/menu?available=true");

export const getReviews = () => request("/api/reviews");

export const createOrder = (payload) =>
  request("/api/orders", { method: "POST", body: JSON.stringify(payload) });

export const submitReview = (payload) =>
  request("/api/reviews", { method: "POST", body: JSON.stringify(payload) });
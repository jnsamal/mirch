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

// Admin endpoints are gated by the shared ADMIN_KEY, sent as a Bearer
// header. Pass the key from AdminContext on every call.
const adminHeaders = (key) => (key ? { Authorization: `Bearer ${key}` } : {});

export const getMenu = () => request("/api/menu?available=true");

export const getReviews = () => request("/api/reviews");

export const createOrder = (payload) =>
  request("/api/orders", { method: "POST", body: JSON.stringify(payload) });

export const submitReview = (payload) =>
  request("/api/reviews", { method: "POST", body: JSON.stringify(payload) });

// ---- Admin (all require the ADMIN_KEY) ----

// Full menu including sold-out items, so admins can toggle availability.
export const getMenuItems = (key) =>
  request("/api/menu", { headers: adminHeaders(key) });

export const createMenuItem = (key, payload) =>
  request("/api/menu", {
    method: "POST",
    headers: adminHeaders(key),
    body: JSON.stringify(payload),
  });

export const updateMenuItem = (key, id, payload) =>
  request(`/api/menu/${id}`, {
    method: "PATCH",
    headers: adminHeaders(key),
    body: JSON.stringify(payload),
  });

export const deleteMenuItem = (key, id) =>
  request(`/api/menu/${id}`, { method: "DELETE", headers: adminHeaders(key) });

// Uploads a menu-item image (multipart form) and returns { url }.
export const uploadImage = async (key, file) => {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    headers: adminHeaders(key),
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

export const deleteImage = (key, filename) =>
  request(`/api/uploads/${encodeURIComponent(filename)}`, {
    method: "DELETE",
    headers: adminHeaders(key),
  });

export const getOrders = (key, status) =>
  request(`/api/orders${status ? `?status=${encodeURIComponent(status)}` : ""}`, {
    headers: adminHeaders(key),
  });

export const updateOrderStatus = (key, id, status) =>
  request(`/api/orders/${id}/status`, {
    method: "PATCH",
    headers: adminHeaders(key),
    body: JSON.stringify({ status }),
  });

export const getPendingReviews = (key) =>
  request("/api/reviews/pending", { headers: adminHeaders(key) });

export const approveReview = (key, id) =>
  request(`/api/reviews/${id}/approve`, { method: "PATCH", headers: adminHeaders(key) });

export const deleteReview = (key, id) =>
  request(`/api/reviews/${id}`, { method: "DELETE", headers: adminHeaders(key) });
import api from "./axiosClient";

export const authApi = {
  signup: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};
export const userApi = {
  list: (params) => api.get("/users", { params }),
  updateMe: (data) => api.patch("/users/me", data),
  update: (id, data) => api.patch(`/users/${id}`, data),
  changeStatus: (id, accountStatus) => api.patch(`/users/${id}/status`, { accountStatus }),
  changeRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
};
export const routineApi = { list: (params) => api.get("/routines", { params }), create: (data) => api.post("/routines", data), remove: (id) => api.delete(`/routines/${id}`) };
export const counselingApi = {
  slots: (params) => api.get("/counseling/slots", { params }), createSlot: (data) => api.post("/counseling/slots", data), updateSlot: (id, data) => api.patch(`/counseling/slots/${id}`, data), deleteSlot: (id) => api.delete(`/counseling/slots/${id}`),
  book: (data) => api.post("/counseling/requests", data), myRequests: () => api.get("/counseling/requests/my"), facultyRequests: () => api.get("/counseling/requests/faculty"), updateRequest: (id, data) => api.patch(`/counseling/requests/${id}`, data),
};
export const announcementApi = { list: (params) => api.get("/announcements", { params }), create: (data) => api.post("/announcements", data), remove: (id) => api.delete(`/announcements/${id}`) };
export const forumApi = { list: (params) => api.get("/forum/posts", { params }), get: (id) => api.get(`/forum/posts/${id}`), create: (data) => api.post("/forum/posts", data), comment: (id, data) => api.post(`/forum/posts/${id}/comments`, data), remove: (id) => api.delete(`/forum/posts/${id}`) };
export const resourceApi = {
  list: (params) => api.get("/resources", { params }), get: (id) => api.get(`/resources/${id}`), create: (data) => api.post("/resources", data), remove: (id) => api.delete(`/resources/${id}`),
  requestAccess: (data) => api.post("/resource-access-requests", data), myAccess: () => api.get("/resource-access-requests/my"), facultyAccess: () => api.get("/resource-access-requests/faculty"), updateAccess: (id, data) => api.patch(`/resource-access-requests/${id}`, data),
};
export const facultyApi = { list: (params) => api.get("/faculty", { params }), get: (id) => api.get(`/faculty/${id}`) };


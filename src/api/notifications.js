import api from "./client";

export async function listNotifications(opts = {}) {
    const { page = 1, limit = 10, type, isRead } = opts;

    const params = { page, limit };
    if (type) params.type = type;
    if (isRead) params.isRead = isRead;

    const res = await api.get("/notifications", { params });
    return res.data;
}

export async function markAllRead() {
    const res = await api.patch("/notifications");
    return res.data;
}

export async function markReadOne(id, payload) {
    const res = await api.put(`/notifications/${id}`, payload);
    return res.data;
}
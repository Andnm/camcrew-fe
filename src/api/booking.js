import api from "./client";

export async function listBookings(opts = {}) {
    const { page = 1, limit = 10, status } = opts;

    const params = { page, limit };
    if (status) params.status = status;

    const res = await api.get("/bookings", { params });
    return res.data;
}

export async function getDetailBookingById(id) {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
}


export async function createNewBooking(payload) {
    const res = await api.post("/bookings", payload);
    return res.data;
}

export async function completedBooking(id) {
    const res = await api.patch(`/bookings/${id}/complete`);
    return res.data;
}
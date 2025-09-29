import api from "./client";

export async function listReviews(opts = {}) {
    const { page = 1, limit = 10, cameraman_id, customer_id, rating } = opts;

    const params = { page, limit };
    if (cameraman_id) params.cameraman_id = cameraman_id;
    if (customer_id) params.customer_id = customer_id;
    if (rating) params.rating = rating;

    const res = await api.get("/reviews", { params });
    return res.data;
}

export async function createNewReviews(payload) {
    const res = await api.post("/reviews", payload);
    return res.data;
}
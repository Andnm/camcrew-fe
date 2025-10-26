import api from "./client";

export async function listBlogs(opts = {}) {
    const { page = 1, limit = 10 } = opts;

    const params = { page, limit };

    const res = await api.get("/blogs", { params });
    return res.data;
}

export async function createNewBlog(payload) {
    const res = await api.post("/blogs", payload);
    return res.data;
}

export async function getBlogById(id) {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
}

export async function updateBlogById(id, data) {
    const res = await api.put(`/blogs/${id}`, data);
    return res.data;
}

export async function deleteBlogById(id) {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
}
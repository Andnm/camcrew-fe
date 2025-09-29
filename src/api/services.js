import api from "./client";

export async function listServices(opts = {}) {
  const {
    page = 1,
    limit = 10,
    styles,
    categories,
    min,
    max,
    areas,
    search,
    status
  } = opts;

  const params = { page, limit };

  if (styles && styles.length) {
    params.styles = Array.isArray(styles) ? styles.join(",") : String(styles);
  }
  if (min != null) params.min = min;
  if (max != null) params.max = max;
  if (categories && categories.length) {
    params.categories = Array.isArray(categories)
      ? categories.join(",")
      : String(categories);
  }
  if (areas && areas.length) {
    params.areas = Array.isArray(areas)
      ? areas.join(",")
      : String(areas);
  }
  if (search) params.search = search;

  const res = await api.get("/services", { params });
  return res.data;
}

export async function createNewReport(payload) {
  const res = await api.post("/reports", payload);
  return res.data;
}

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.oasia.travel/api/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const lang = localStorage.getItem("oasia-lang") || "ru";
  config.headers["Accept-Language"] = lang;
  return config;
});

export default api;
export const getTours = async (category = "") => {
  const res = await api.get("/tours/", { params: { category } });
  return res;
};

export const getTourBySlug = async (slug) => {
  const res = await api.get(`/tours/${slug}/`);
  return res;
};

export const getFeaturedTours = async () => {
  const res = await api.get("/tours/featured/");
  return res;
};

export const getTourCategories = async () => {
  const res = await api.get("/tours/categories/");
  return res;
};

export const getDirections = async () => {
  const res = await api.get("/directions/");
  return res;
};

export const getDirectionBySlug = async (slug) => {
  const res = await api.get(`/directions/${slug}/`);
  return res;
};

export const getGalleryImages = async (category__slug = "") => {
  const res = await api.get("/gallery/", { params: { category__slug } });
  return res;
};

export const getGalleryById = async (id) => {
  const res = await api.get(`/gallery/${id}/`);
  return res;
};

export const getGalleryCategories = async () => {
  const res = await api.get("/gallery/categories/");
  return res;
};

export const getFAQ = async () => {
  const res = await api.get("/faq/");
  return res;
};

export const getFAQById = async (id) => {
  const res = await api.get(`/faq/${id}/`);
  return res;
};

export const getServices = async () => {
  const res = await api.get("services/services/");
  return res;
};

export const getServiceById = async (id) => {
  const res = await api.get(`services/services/${id}/`);
  return res;
};

export const submitContactForm = async (formData) => {
  const res = await api.post("/services/contact/", formData);
  return res;
};
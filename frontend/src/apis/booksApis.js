import axiosInstance from "./axios";

export const getBooks = (signal) => axiosInstance.get("/books", { signal });
export const addBook = (data) => axiosInstance.post("/books", data);

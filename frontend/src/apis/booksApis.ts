import { bookType } from "../types";
import axiosInstance from "./axios";

export const getBooks = (signal: AbortSignal) =>
  axiosInstance.get("/books", { signal });
export const addBook = (data: bookType) => axiosInstance.post("/books", data);

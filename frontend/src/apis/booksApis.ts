import { bookType } from "../types";
import axiosInstance, { axiosImportInstance } from "./axios";

export const getBooks = (signal: AbortSignal) =>
  axiosInstance.get("/books", { signal });
export const addBook = (data: FormData) =>
  axiosImportInstance.post("/books", data);

export const updateBook = (bookId: string | number, data: FormData) =>
  axiosImportInstance.put(`/${bookId}`, data);

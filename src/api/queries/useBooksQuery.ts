import { useQuery } from "@tanstack/react-query";
import { apiGet, type FileJsonResponse } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

export const useBooksQuery = () => {
  return useQuery<FileJsonResponse, Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet(ENDPOINTS.books),
  });
};

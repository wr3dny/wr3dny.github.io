import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";
import type { Book } from "../../pages/Books/Books.tsx";

export const useBooksQuery = () => {
  return useQuery<Book[], Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet<Book[]>(ENDPOINTS.books),
  });
};

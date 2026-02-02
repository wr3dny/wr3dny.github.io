import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

export type Book = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  originalTitle: string | null;
  worldHero: string | null;
  numberInSeries: number | null;
  subSeries: string | null;
  numberInSubSeries: number | null;
  format: string | null;
  language: string | null;
};

export const useBooksQuery = () =>
  useQuery<Book[], Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet<Book[]>(ENDPOINTS.books),
  });

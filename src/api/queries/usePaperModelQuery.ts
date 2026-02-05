import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

export type PaperModel = {
  id: number;
  number: number;
  title: string;
  scale: string;
  owned: boolean;
};

export const usePaperModelQuery = () => {
  return useQuery<PaperModel[], Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet<PaperModel[]>(ENDPOINTS.books),
  });
};

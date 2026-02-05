import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

export type Lego = {
  id: number;
  series: string;
  setNumber: number;
  year: number;
};

export const useLegoQuery = () => {
  return useQuery<Lego[], Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet<Lego[]>(ENDPOINTS.books),
  });
};

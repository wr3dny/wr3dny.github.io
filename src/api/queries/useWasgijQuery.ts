import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

export type Wasgij = {
  id: number;
  series: string;
  publisher: string;
  numberInSeries: number;
  title: string;
  pieces: number;
  piecesInBox: number;
  owned: boolean;
};

export const useWasgijQuery = () => {
  return useQuery<Wasgij[], Error>({
    queryKey: ["files", "books"],
    queryFn: () => apiGet<Wasgij[]>(ENDPOINTS.books),
  });
};

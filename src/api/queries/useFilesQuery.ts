import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../endpoints.ts";
import { apiGet } from "../http.ts";

export const useFilesQuery = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => apiGet(ENDPOINTS.files),
  });
};

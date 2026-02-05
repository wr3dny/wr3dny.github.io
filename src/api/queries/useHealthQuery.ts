import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints.ts";
import { apiGet } from "../http.ts";

export type HealthResponse = {
  status: string;
};

export const useHealthQuery = () => {
  return useQuery<HealthResponse, Error>({
    queryKey: ["health"],
    queryFn: () => apiGet<HealthResponse>(ENDPOINTS.health),
  });
};

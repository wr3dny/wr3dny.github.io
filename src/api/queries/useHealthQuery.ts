import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "../endpoints.ts";
import { apiGet } from "../http.ts";

export const useHealthQuery = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => apiGet(ENDPOINTS.health),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "../health.ts";

export const useHealthQuery = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => getHealth("https://collectorium-api.onrender.com/health"),
  });
};

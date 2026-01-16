import { getFiles } from "../files.ts";
import { useQuery } from "@tanstack/react-query";

export const useFilesQuery = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles("https://collectorium-api.onrender.com/health"),
  });
};

import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type Answer = {
  id: string;
  value: string;
};

const fetchAllAnswers = async (): Promise<Answer[]> => {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const useAllAnswersQuery = () => {
  return useQuery({
    queryKey: ["answers"],
    queryFn: fetchAllAnswers,
  });
};

const API_FAST_URL = import.meta.env.VITE_API_URL as string;

export const apiGet = async <T = unknown>(path: string): Promise<T> => {
  const response = await fetch(`${API_FAST_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${path} failed with status code ${response.status}`);
  }

  return (await response.json()) as T;
};

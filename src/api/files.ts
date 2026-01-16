const API_URL = import.meta.env.VITE_API_URL as string;

export const getFiles = async (path: string) => {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${path} failed with status code ${response.status}`);
  }

  return response.json();
};

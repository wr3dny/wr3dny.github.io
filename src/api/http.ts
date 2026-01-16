const API_URL = import.meta.env.VITE_API_URL as string;

export type HealthResponse = { status: string };
export type FilesResponse = string[];
export type FileJsonResponse = Array<Record<string, unknown>>;

export async function apiGet(path: "/health"): Promise<HealthResponse>;
export async function apiGet(path: "/files"): Promise<FilesResponse>;
export async function apiGet(
  path: `/files/${string}`,
): Promise<FileJsonResponse>;
export async function apiGet<T = unknown>(path: string): Promise<T>;

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${path} failed with status code ${response.status}`);
  }

  if (path === "/health") {
    return (await response.json()) as T;
  }

  if (path === "/files") {
    return (await response.json()) as T;
  }

  if (path.startsWith("/files/")) {
    return (await response.json()) as T;
  }

  throw new Error(`Unhandled endpoint: ${path}`);
}

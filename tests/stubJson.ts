import { vi } from "vitest";

/** Replaces fetch: answers requests whose URL ends with one of the given file names. */
export const stubJson = (files: Record<string, unknown>) => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const name = Object.keys(files).find((file) => String(url).endsWith(file));
      return name === undefined
        ? { ok: false, status: 404, json: async () => ({}) }
        : { ok: true, status: 200, json: async () => files[name] };
    }),
  );
};

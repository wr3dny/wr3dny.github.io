import { useEffect, useState } from "react";

type JsonState<T> = { data?: T; error?: Error };

/**
 * Loads one file from public/data (for example "books.json") when the
 * component mounts. Replaces a data-fetching library: the site only reads
 * two small static files.
 */
export function useJson<T>(fileName: string) {
  const [state, setState] = useState<JsonState<T>>({});

  useEffect(() => {
    const controller = new AbortController();
    setState({});

    fetch(`${import.meta.env.BASE_URL}data/${fileName}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<T>;
      })
      .then((data) => setState({ data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          error: error instanceof Error ? error : new Error(String(error)),
        });
      });

    return () => controller.abort();
  }, [fileName]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.data === undefined && state.error === undefined,
  };
}

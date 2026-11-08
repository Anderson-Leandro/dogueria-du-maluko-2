import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../services/api";

/**
 * Carrega um recurso da API com estados de loading/erro,
 * cancelando a requisição anterior ao recarregar ou desmontar.
 */
export function useApiResource<T>(fetcher: (signal: AbortSignal) => Promise<T>, errorMessage: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current(controller.signal);
      if (!controller.signal.aborted) setData(result);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(getErrorMessage(err, errorMessage));
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return { data, loading, error, refresh: load };
}

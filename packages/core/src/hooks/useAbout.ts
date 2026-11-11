import { aboutService } from "../services/aboutService";
import { useApiResource } from "./useApiResource";

export function useAbout() {
  const { data, loading, error, refresh } = useApiResource(
    (signal) => aboutService.getAboutData(signal),
    "Erro ao carregar dados institucionais"
  );

  return {
    aboutData: data,
    loading,
    error,
    refreshAboutData: refresh,
  };
}

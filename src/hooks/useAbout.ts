import { useState, useEffect, useCallback } from "react";
import { AboutData } from "../types/about";
import { aboutService } from "../services/aboutService";
import { mockAboutData } from "../data/about.data";

export function useAbout() {
  const [aboutData, setAboutData] = useState<AboutData>(mockAboutData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await aboutService.getAboutData();
      setAboutData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados institucionais");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  return {
    aboutData,
    loading,
    error,
    refreshAboutData: fetchAboutData,
  };
}

import { useEffect, useState } from "react";
import { StoreSettings } from "../types/settings";
import { DEFAULT_SETTINGS, settingsService } from "../services/settingsService";

/** Regras da loja (frete); usa os padrões até a API responder */
export function useSettings(): StoreSettings {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let active = true;
    settingsService
      .getSettings()
      .then((s) => active && setSettings(s))
      .catch(() => {
        // mantém os padrões
      });
    return () => {
      active = false;
    };
  }, []);

  return settings;
}

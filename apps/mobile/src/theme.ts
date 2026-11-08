/** Tokens visuais iguais aos do web (apps/web/src/styles/theme.css) */
export const colors = {
  primary: "#ff6b00",
  primaryPressed: "#fb923c",
  secondary: "#0057b7",
  accent: "#ffd700",
  background: "#f0f2f7",
  foreground: "#1a1a2e",
  card: "#ffffff",
  muted: "#e5e7eb",
  mutedForeground: "#6b7280",
  border: "rgba(0, 0, 0, 0.08)",
  dark: "#1a1a2e",
  darker: "#0f0f1a",
  panel: "#13132a",
  destructive: "#d4183d",
  success: "#16a34a",
  white: "#ffffff",
  whiteMuted: "rgba(255, 255, 255, 0.6)",
} as const;

export const fonts = {
  display: "Bangers_400Regular",
  regular: "Nunito_400Regular",
  semibold: "Nunito_600SemiBold",
  bold: "Nunito_700Bold",
  extrabold: "Nunito_800ExtraBold",
  black: "Nunito_900Black",
} as const;

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 } as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

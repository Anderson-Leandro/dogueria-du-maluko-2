/**
 * Configuração dinâmica (estende o app.json).
 * Define a URL da API usada pelo app em `extra.apiUrl`:
 *  1. EXPO_PUBLIC_API_URL, se definida (ex.: no .env deste app)
 *  2. No GitHub Codespaces: a URL pública encaminhada da porta 3333
 *  3. Senão, fica vazia e o app deduz o IP da máquina que roda o Expo (src/lib/apiUrl.ts)
 */
function codespacesApiUrl() {
  const name = process.env.CODESPACE_NAME;
  const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
  return name && domain ? `https://${name}-3333.${domain}/api` : undefined;
}

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl: process.env.EXPO_PUBLIC_API_URL || codespacesApiUrl() || null,
  },
});

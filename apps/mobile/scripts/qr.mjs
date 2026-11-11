/**
 * Gera o QR code do Expo como IMAGEM (PNG) e abre na tela.
 *
 * Útil quando o QR desenhado no terminal sai distorcido (altura de linha
 * ou fonte do terminal deixam espaços entre os blocos e a câmera não lê).
 *
 * Uso:
 *   npm run mobile:qr                         → exp://<IP desta máquina>:8081
 *   npm run mobile:qr -- exp://abc.exp.direct → URL exibida pelo Expo (túnel/Codespaces)
 */
import { networkInterfaces, platform } from "node:os";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import QRCode from "qrcode";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** IP da rede local (o mesmo tipo de endereço que o Expo mostra em "Metro: exp://...") */
function lanAddress() {
  const candidates = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === "IPv4" && !i.internal)
    .map((i) => i.address)
    // ignora redes virtuais do Docker (172.17.x.x, 172.18.x.x...)
    .filter((ip) => !/^172\.(1[7-9]|2\d|3[01])\./.test(ip));
  return (
    candidates.find((ip) => ip.startsWith("192.168.")) ??
    candidates.find((ip) => ip.startsWith("10.")) ??
    candidates[0]
  );
}

const arg = process.argv[2];
let url = arg;
if (!url) {
  const ip = lanAddress();
  if (!ip) {
    console.error("Não encontrei o IP da rede local. Passe a URL exibida pelo Expo: npm run mobile:qr -- exp://...");
    process.exit(1);
  }
  url = `exp://${ip}:8081`;
}
if (!/^exps?:\/\/|^https?:\/\//.test(url)) {
  console.error(`URL inválida: "${url}". Use a URL exibida pelo Expo (ex.: exp://192.168.0.10:8081).`);
  process.exit(1);
}

const outDir = resolve(appRoot, ".expo");
const file = resolve(outDir, "qr-code.png");
mkdirSync(outDir, { recursive: true });
await QRCode.toFile(file, url, { width: 480, margin: 4, errorCorrectionLevel: "M" });

console.log(`\n📱 QR code do Expo: ${url}`);
console.log(`   Imagem: ${file}`);
console.log(`   Ou digite a URL no Expo Go em "Enter URL manually".\n`);

// Abre a imagem no visualizador padrão do sistema (sem travar o terminal)
const opener = { darwin: "open", win32: "cmd" }[platform()] ?? "xdg-open";
const args = platform() === "win32" ? ["/c", "start", "", file] : [file];
const child = spawn(opener, args, { stdio: "ignore", detached: true });
child.on("error", () => console.log("   (não consegui abrir a imagem automaticamente — abra o arquivo acima)"));
child.unref();

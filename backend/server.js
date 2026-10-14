// Central SDR BeeFood — backend
// Serve o conteúdo (pasta data/) como API e entrega o frontend.
// Sem dependências externas: só Node.js 18+.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const FRONT_DIR = path.join(__dirname, "..", "frontend");
const SECOES = ["roteiros", "funcionalidades", "duvidas", "planos", "boas-praticas", "regras"];

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Lê os JSON a cada pedido: editou um arquivo em data/, é só recarregar a página.
function lerSecao(nome) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, nome + ".json"), "utf8"));
}

function json(res, status, corpo) {
  res.writeHead(status, {
    "Content-Type": TIPOS[".json"],
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(corpo));
}

function api(req, res, rota) {
  try {
    if (rota === "/api/conteudo") {
      const tudo = {};
      for (const s of SECOES) tudo[s] = lerSecao(s);
      return json(res, 200, tudo);
    }
    if (rota === "/api/secoes") return json(res, 200, SECOES);
    const secao = rota.replace("/api/", "");
    if (SECOES.includes(secao)) return json(res, 200, lerSecao(secao));
    return json(res, 404, { erro: "Seção não encontrada", secoes: SECOES });
  } catch (e) {
    return json(res, 500, { erro: "Erro ao ler o conteúdo: " + e.message });
  }
}

function estatico(res, rota) {
  const arquivo = path.normalize(path.join(FRONT_DIR, rota === "/" ? "index.html" : rota));
  if (!arquivo.startsWith(FRONT_DIR)) { res.writeHead(403); return res.end(); }
  fs.readFile(arquivo, (err, buf) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Não encontrado"); }
    res.writeHead(200, { "Content-Type": TIPOS[path.extname(arquivo)] || "application/octet-stream" });
    res.end(buf);
  });
}

http.createServer((req, res) => {
  const rota = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": "*" }); return res.end(); }
  if (req.method !== "GET") return json(res, 405, { erro: "Só leitura (GET)" });
  if (rota.startsWith("/api/")) return api(req, res, rota);
  return estatico(res, rota);
}).listen(PORT, () => console.log(`Central SDR BeeFood rodando em http://localhost:${PORT}`));

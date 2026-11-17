import "dotenv/config";
import express from "express";
import db from "./db.js";
import doadores from "./routes/doadores.js";
import itens from "./routes/itens.js";
import doacoes from "./routes/doacoes.js";

const app = express();
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", async (_req, res) => {
  let banco = "ok";
  try {
    await db.query("SELECT 1");
  } catch {
    banco = "sem conexão";
  }
  res.json({
    status: "ok",
    banco,
    app: "Rede Semeia",
    hora: new Date().toISOString(),
  });
});

app.use("/api/doadores", doadores);
app.use("/api/itens", itens);
app.use("/api/doacoes", doacoes);

app.use("/api", (_req, res) => {
  res.status(404).json({ erro: "Rota da API não encontrada" });
});

app.use((erro, _req, res, _next) => {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
  }
  console.error(erro);
  return res.status(500).json({ erro: "Erro interno no servidor" });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, "127.0.0.1", () => {
  console.log(`API da Rede Semeia em http://127.0.0.1:${port}`);
});

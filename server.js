import express from "express";
import cors from "cors";
import { crawlSite } from "./crawler.js";
import fs from "fs-extra";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/crawl", async (req, res) => {
  const { url, limit } = req.body;
  if (!url) return res.status(400).json({ error: "URL obrigatória" });

  console.log(`🚀 Iniciando crawling para: ${url}`);
  const resultados = await crawlSite(url, limit || 3);
  res.json({ total: resultados.length, resultados });
});

app.get("/resultados", async (req, res) => {
  try {
    const data = await fs.readJson("dados/resultados.json");
    res.json(data);
  } catch {
    res.json([]);
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));

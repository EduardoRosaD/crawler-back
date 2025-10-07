import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs-extra";

export async function crawlSite(url, limit = 3) {
  const resultados = [];

  for (let i = 1; i <= limit; i++) {
    const paginaUrl = `${url}/page/${i}/`;
    console.log(`🔍 Extraindo página ${i}: ${paginaUrl}`);

    try {
      const { data } = await axios.get(paginaUrl);
      const $ = cheerio.load(data);

      $(".quote").each((_, el) => {
        const texto = $(el).find(".text").text().trim();
        const autor = $(el).find(".author").text().trim();
        const tags = [];
        $(el).find(".tag").each((_, tagEl) => {
          tags.push($(tagEl).text());
        });
        resultados.push({ texto, autor, tags });
      });
    } catch (err) {
      console.log(`⚠️ Erro na página ${i}: ${err.message}`);
      break;
    }
  }

  await fs.ensureDir("dados");
  await fs.writeJson("dados/resultados.json", resultados, { spaces: 2 });
  console.log(resultados)
  return resultados;
}

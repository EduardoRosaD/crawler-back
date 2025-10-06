# crawler-back

Backend para crawler web utilizando Cheerio - um serviço de web scraping rápido e flexível.

## 🚀 Características

- API RESTful para web scraping
- Extração de dados usando seletores CSS
- Suporte para múltiplos tipos de extração:
  - Dados customizados com seletores
  - Links de páginas
  - Imagens de páginas
- Validação de URLs
- Tratamento de erros robusto

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EduardoRosaD/crawler-back.git
cd crawler-back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

## 🚀 Uso

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor iniciará na porta 3000 (ou a porta definida no .env).

## 📡 API Endpoints

### GET /
Retorna informações sobre a API

### POST /api/crawl
Faz crawling de uma URL e extrai dados baseados em seletores CSS.

**Request Body:**
```json
{
  "url": "https://example.com",
  "selectors": {
    "title": "h1",
    "description": ".description",
    "items": ".item-list li"
  }
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "data": {
    "title": "Example Title",
    "description": "Example Description",
    "items": ["Item 1", "Item 2", "Item 3"]
  }
}
```

### POST /api/extract
Extrai dados de conteúdo HTML usando seletores CSS.

**Request Body:**
```json
{
  "html": "<html>...</html>",
  "selectors": {
    "heading": "h1",
    "paragraphs": "p"
  }
}
```

### POST /api/extract-links
Extrai todos os links de uma página.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "links": [
    {
      "text": "Link Text",
      "href": "https://example.com/page",
      "target": "_blank"
    }
  ]
}
```

### POST /api/extract-images
Extrai todas as imagens de uma página.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "images": [
    {
      "src": "https://example.com/image.jpg",
      "alt": "Image Description",
      "title": "Image Title"
    }
  ]
}
```

## 🛠️ Tecnologias

- **Express** - Framework web
- **Cheerio** - Parser HTML e manipulação DOM
- **Axios** - Cliente HTTP
- **CORS** - Middleware para habilitar CORS
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📝 Exemplo de Uso com cURL

```bash
# Crawl básico
curl -X POST http://localhost:3000/api/crawl \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Crawl com seletores customizados
curl -X POST http://localhost:3000/api/crawl \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "selectors": {
      "title": "h1",
      "items": ".item"
    }
  }'

# Extrair links
curl -X POST http://localhost:3000/api/extract-links \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

ISC

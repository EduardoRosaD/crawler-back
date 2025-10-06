import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crawlerRoutes from './routes/crawlerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Crawler Backend API',
    version: '1.0.0',
    endpoints: {
      crawl: 'POST /api/crawl',
      extract: 'POST /api/extract'
    }
  });
});

app.use('/api', crawlerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Crawler Backend running on port ${PORT}`);
});

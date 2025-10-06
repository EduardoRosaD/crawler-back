import express from 'express';
import crawlerService from '../services/crawlerService.js';
import { validateUrl } from '../utils/validators.js';

const router = express.Router();

/**
 * POST /api/crawl
 * Crawl a website and extract data based on CSS selectors
 */
router.post('/crawl', async (req, res) => {
  try {
    const { url, selectors } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    if (!validateUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    const result = await crawlerService.crawl(url, selectors);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/extract
 * Extract data from HTML content using CSS selectors
 */
router.post('/extract', async (req, res) => {
  try {
    const { html, selectors } = req.body;

    if (!html) {
      return res.status(400).json({
        success: false,
        error: 'HTML content is required'
      });
    }

    if (!selectors || Object.keys(selectors).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Selectors object is required'
      });
    }

    const result = crawlerService.extractFromHTML(html, selectors);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/extract-links
 * Extract all links from a page
 */
router.post('/extract-links', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    if (!validateUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    const result = await crawlerService.extractLinks(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/extract-images
 * Extract all images from a page
 */
router.post('/extract-images', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    if (!validateUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }

    const result = await crawlerService.extractImages(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

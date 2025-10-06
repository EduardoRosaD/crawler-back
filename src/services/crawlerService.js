import axios from 'axios';
import * as cheerio from 'cheerio';

class CrawlerService {
  /**
   * Fetch HTML content from a URL
   * @param {string} url - The URL to crawl
   * @returns {Promise<string>} HTML content
   */
  async fetchHTML(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch URL: ${error.message}`);
    }
  }

  /**
   * Crawl a website and extract data based on selectors
   * @param {string} url - The URL to crawl
   * @param {Object} selectors - CSS selectors for data extraction
   * @returns {Promise<Object>} Extracted data
   */
  async crawl(url, selectors = {}) {
    try {
      const html = await this.fetchHTML(url);
      const $ = cheerio.load(html);
      const result = {};

      // Extract data based on provided selectors
      if (selectors && Object.keys(selectors).length > 0) {
        for (const [key, selector] of Object.entries(selectors)) {
          const elements = $(selector);
          
          if (elements.length > 1) {
            // Multiple elements - return array
            result[key] = elements.map((i, el) => $(el).text().trim()).get();
          } else if (elements.length === 1) {
            // Single element - return string
            result[key] = elements.text().trim();
          } else {
            result[key] = null;
          }
        }
      } else {
        // Default extraction: title, headings, paragraphs, links
        result.title = $('title').text().trim();
        result.headings = $('h1, h2, h3').map((i, el) => $(el).text().trim()).get();
        result.paragraphs = $('p').map((i, el) => $(el).text().trim()).get();
        result.links = $('a').map((i, el) => ({
          text: $(el).text().trim(),
          href: $(el).attr('href')
        })).get();
      }

      return {
        success: true,
        url,
        data: result
      };
    } catch (error) {
      throw new Error(`Crawl failed: ${error.message}`);
    }
  }

  /**
   * Extract specific data from HTML content
   * @param {string} html - HTML content
   * @param {Object} selectors - CSS selectors for data extraction
   * @returns {Object} Extracted data
   */
  extractFromHTML(html, selectors) {
    try {
      const $ = cheerio.load(html);
      const result = {};

      for (const [key, selector] of Object.entries(selectors)) {
        const elements = $(selector);
        
        if (elements.length > 1) {
          result[key] = elements.map((i, el) => $(el).text().trim()).get();
        } else if (elements.length === 1) {
          result[key] = elements.text().trim();
        } else {
          result[key] = null;
        }
      }

      return {
        success: true,
        data: result
      };
    } catch (error) {
      throw new Error(`Extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract all links from a page
   * @param {string} url - The URL to crawl
   * @returns {Promise<Array>} Array of links
   */
  async extractLinks(url) {
    try {
      const html = await this.fetchHTML(url);
      const $ = cheerio.load(html);
      
      const links = $('a').map((i, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr('href'),
        target: $(el).attr('target')
      })).get();

      return {
        success: true,
        url,
        links
      };
    } catch (error) {
      throw new Error(`Link extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract all images from a page
   * @param {string} url - The URL to crawl
   * @returns {Promise<Array>} Array of images
   */
  async extractImages(url) {
    try {
      const html = await this.fetchHTML(url);
      const $ = cheerio.load(html);
      
      const images = $('img').map((i, el) => ({
        src: $(el).attr('src'),
        alt: $(el).attr('alt'),
        title: $(el).attr('title')
      })).get();

      return {
        success: true,
        url,
        images
      };
    } catch (error) {
      throw new Error(`Image extraction failed: ${error.message}`);
    }
  }
}

export default new CrawlerService();

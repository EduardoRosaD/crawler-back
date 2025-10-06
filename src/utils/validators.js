/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

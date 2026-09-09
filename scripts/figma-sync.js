/**
 * scripts/figma-sync.js
 * Automated sync script to fetch design tokens & variables from Figma REST API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'oFZw7IVtiURZG2x5XhAKyD';

if (!FIGMA_TOKEN) {
  console.log('Notice: FIGMA_ACCESS_TOKEN not found in environment. Skipping remote fetch.');
  process.exit(0);
}

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${FILE_KEY}/variables/local`,
  headers: {
    'X-Figma-Token': FIGMA_TOKEN
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.warn(`Figma API returned status ${res.statusCode}: ${data}`);
      process.exit(0);
    }

    try {
      const response = JSON.parse(data);
      console.log('Successfully connected to Figma API. Processing variables...');
      // Future processing hook to update tokens.json / tokens.css automatically
    } catch (err) {
      console.error('Error parsing Figma API response:', err);
    }
  });
}).on('error', (err) => {
  console.error('Network error requesting Figma API:', err);
  process.exit(0);
});

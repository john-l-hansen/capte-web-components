/**
 * scripts/figma-sync.js
 * Automated sync script to fetch design system status & updates from Figma REST API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'oFZw7IVtiURZG2x5XhAKyD';
const SYNC_META_PATH = path.join(__dirname, '../design-system/.figma-sync.json');

if (!FIGMA_TOKEN) {
  console.log('Notice: FIGMA_ACCESS_TOKEN not found in environment. Skipping sync.');
  process.exit(0);
}

function fetchFigmaFile(fileKey, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${fileKey}?depth=2`,
      headers: {
        'X-Figma-Token': token
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Figma API returned status ${res.statusCode}: ${data}`));
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    console.log(`Checking Figma Design System [${FILE_KEY}]...`);
    const fileData = await fetchFigmaFile(FILE_KEY, FIGMA_TOKEN);

    let prevMeta = {};
    if (fs.existsSync(SYNC_META_PATH)) {
      try {
        prevMeta = JSON.parse(fs.readFileSync(SYNC_META_PATH, 'utf8'));
      } catch (e) {
        prevMeta = {};
      }
    }

    const currentMeta = {
      fileName: fileData.name,
      fileKey: FILE_KEY,
      lastModified: fileData.lastModified,
      version: fileData.version,
      lastChecked: new Date().toISOString(),
      componentCount: Object.keys(fileData.components || {}).length,
      styleCount: Object.keys(fileData.styles || {}).length
    };

    console.log(`Current Figma file: "${currentMeta.fileName}"`);
    console.log(`Last modified in Figma: ${currentMeta.lastModified}`);
    console.log(`Components: ${currentMeta.componentCount}, Styles: ${currentMeta.styleCount}`);

    if (prevMeta.lastModified !== currentMeta.lastModified || prevMeta.version !== currentMeta.version) {
      console.log('⚡ Detected updates in Figma Design System!');
      fs.writeFileSync(SYNC_META_PATH, JSON.stringify(currentMeta, null, 2) + '\n', 'utf8');
      console.log(`Updated ${SYNC_META_PATH} to trigger automated PR.`);
    } else {
      console.log('✅ Design system in sync. No new modifications in Figma.');
    }
  } catch (error) {
    console.error('Error during Figma sync:', error.message);
    process.exit(1);
  }
}

run();

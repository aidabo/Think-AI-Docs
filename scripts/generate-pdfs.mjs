import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const DIST = join(__dirname, '..', 'docs', '.vitepress', 'dist');
const PUBLIC = join(__dirname, '..', 'docs', 'public');

// Ensure public dir exists
if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function serveStatic(reqUrl) {
  const cleanUrl = reqUrl.split('?')[0];
  let filePath = join(DIST, cleanUrl === '/' ? 'index.html' : cleanUrl);

  try {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      filePath = join(filePath, 'index.html');
    }
  } catch { /* not found, proceed */ }

  if (!existsSync(filePath)) {
    // Try with .html extension
    const htmlPath = filePath + '.html';
    if (existsSync(htmlPath)) filePath = htmlPath;
    else return null;
  }
  return filePath;
}

// Start a simple HTTP server for the built site
const server = createServer((req, res) => {
  const filePath = serveStatic(req.url);
  if (!filePath) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  const ext = extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  res.end(readFileSync(filePath));
});

await new Promise(resolve => server.listen(4321, resolve));
console.log('Server running at http://localhost:4321');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const pages = [
  // JA Marketing
  { url: '/marketing/', name: 'marketing-ja' },
  { url: '/marketing/features', name: 'marketing-features-ja' },
  { url: '/marketing/comparison', name: 'marketing-comparison-ja' },
  { url: '/marketing/use-cases', name: 'marketing-use-cases-ja' },
  { url: '/marketing/pricing', name: 'marketing-pricing-ja' },
  // EN Marketing
  { url: '/en/marketing/', name: 'marketing-en' },
  { url: '/en/marketing/features', name: 'marketing-features-en' },
  { url: '/en/marketing/comparison', name: 'marketing-comparison-en' },
  { url: '/en/marketing/use-cases', name: 'marketing-use-cases-en' },
  { url: '/en/marketing/pricing', name: 'marketing-pricing-en' },
  // ZH Marketing
  { url: '/zh/marketing/', name: 'marketing-zh' },
  { url: '/zh/marketing/features', name: 'marketing-features-zh' },
  { url: '/zh/marketing/comparison', name: 'marketing-comparison-zh' },
  { url: '/zh/marketing/use-cases', name: 'marketing-use-cases-zh' },
  { url: '/zh/marketing/pricing', name: 'marketing-pricing-zh' },
  // JA Operations
  { url: '/operations/', name: 'operations-ja' },
  { url: '/operations/deployment', name: 'operations-deployment-ja' },
  { url: '/operations/admin-guide', name: 'operations-admin-guide-ja' },
  { url: '/operations/user-guide', name: 'operations-user-guide-ja' },
  { url: '/operations/troubleshooting', name: 'operations-troubleshooting-ja' },
  // EN Operations
  { url: '/en/operations/', name: 'operations-en' },
  { url: '/en/operations/deployment', name: 'operations-deployment-en' },
  { url: '/en/operations/admin-guide', name: 'operations-admin-guide-en' },
  { url: '/en/operations/user-guide', name: 'operations-user-guide-en' },
  { url: '/en/operations/troubleshooting', name: 'operations-troubleshooting-en' },
  // ZH Operations
  { url: '/zh/operations/', name: 'operations-zh' },
  { url: '/zh/operations/deployment', name: 'operations-deployment-zh' },
  { url: '/zh/operations/admin-guide', name: 'operations-admin-guide-zh' },
  { url: '/zh/operations/user-guide', name: 'operations-user-guide-zh' },
  { url: '/zh/operations/troubleshooting', name: 'operations-troubleshooting-zh' },
];

for (const { url, name } of pages) {
  console.log(`Generating ${name}.pdf...`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://localhost:4321${url}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: join(PUBLIC, `${name}.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
  });
  await page.close();
}

await browser.close();
server.close();
console.log('All PDFs generated successfully!');

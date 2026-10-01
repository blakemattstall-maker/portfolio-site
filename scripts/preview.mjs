// Serve the exact Cloudflare export locally, including clean paths and redirects.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../out/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
await stat(resolve(root, 'index.html')).catch(() => { console.error('Build first with npm run build.'); process.exit(1); });
const redirects = (await readFile(resolve(root, '_redirects'), 'utf8')).split('\n').filter(l => l.trim() && !l.startsWith('#')).map(l => l.trim().split(/\s+/));
createServer(async (req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const redirect = redirects.find(([from]) => from === pathname);
    if (redirect) { res.writeHead(Number(redirect[2]), { Location: redirect[1] }); res.end(); return; }
    const base = resolve(root, '.' + pathname);
    if (!base.startsWith(root.endsWith(sep) ? root : root + sep) && base !== resolve(root)) { res.writeHead(403); res.end(); return; }
    let file;
    for (const candidate of [base, base + '.html', resolve(base, 'index.html')]) {
      if ((await stat(candidate).catch(() => null))?.isFile()) { file = candidate; break; }
    }
    const status = file ? 200 : 404;
    file ||= resolve(root, '404.html');
    const data = await readFile(file);
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.setHeader('Accept-Ranges', 'bytes');
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && status === 200) {
      const start = Number(range[1]);
      const end = Math.min(range[2] ? Number(range[2]) : data.length - 1, data.length - 1);
      if (start > end || start >= data.length) { res.writeHead(416, { 'Content-Range': `bytes */${data.length}` }); res.end(); return; }
      res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 });
      res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1));
      return;
    }
    res.writeHead(status, { 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://localhost:${port}`));

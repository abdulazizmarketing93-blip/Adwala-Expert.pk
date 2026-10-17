const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? '/index.html' : req.url;
  reqPath = reqPath.split('?')[0];

  // Prevent directory traversal attacks
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // If path doesn't have an extension, try checking .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();

  // Basic Security & Performance Headers
  const baseHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, Object.assign({}, baseHeaders, { 'Content-Type': 'text/html; charset=utf-8' }));
      res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title><style>body{background:#07080a;color:#f3f4f6;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column}a{color:#f59e0b;text-decoration:none;margin-top:20px;padding:10px 20px;border:1px solid #f59e0b;border-radius:8px}</style></head><body><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="/">Return to Home</a></body></html>`);
      return;
    }

    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, Object.assign({}, baseHeaders, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + stats.size,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      }));
      file.pipe(res);
    } else {
      res.writeHead(200, Object.assign({}, baseHeaders, {
        'Content-Length': stats.size,
        'Content-Type': (mime[ext] || 'application/octet-stream') + (ext === '.html' || ext === '.css' || ext === '.js' ? '; charset=utf-8' : ''),
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
      }));
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(port, () => {
  console.log('Adwala Experts preview server running at http://localhost:' + port);
});

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const server = http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root,file);
  const allowed = relative === 'index.html' || relative.startsWith('assets'+path.sep) || relative === path.join('scripts','site.js');
  if (!allowed || relative.startsWith('..')) { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(file,(err,data) => { if(err) {res.writeHead(404);return res.end('Not found');} res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data); });
});

const selectedPort = Number(process.env.SAMI_PORT || 4173);
if (!Number.isInteger(selectedPort) || selectedPort < 1 || selectedPort > 65535) {
  console.error('SAMI_PORT harus berupa nomor port antara 1 dan 65535.');
  process.exit(1);
}

let port = selectedPort;
server.on('listening', () => console.log(`SAMI preview: http://127.0.0.1:${port}`));
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && !process.env.SAMI_PORT && port < 4178) {
    console.log(`Port ${port} sedang digunakan. Mencoba port ${port + 1}…`);
    port += 1;
    server.listen(port, '127.0.0.1');
    return;
  }
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} masih digunakan. Buka server yang sudah berjalan atau pilih port lain dengan SAMI_PORT.`);
  } else {
    console.error(`Server tidak dapat dijalankan: ${error.message}`);
  }
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1');

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

if (path.relative(root, output) !== 'dist') {
  throw new Error('Direktori output harus berada di dalam proyek.');
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
fs.mkdirSync(path.join(output, 'scripts'), { recursive: true });

fs.copyFileSync(path.join(root, 'index.html'), path.join(output, 'index.html'));
fs.copyFileSync(path.join(root, 'assets', 'site.css'), path.join(output, 'assets', 'site.css'));
fs.cpSync(path.join(root, 'assets', 'images'), path.join(output, 'assets', 'images'), {
  recursive: true,
});
fs.copyFileSync(path.join(root, 'scripts', 'site.js'), path.join(output, 'scripts', 'site.js'));

console.log('Berkas siap untuk Vercel di dist/');

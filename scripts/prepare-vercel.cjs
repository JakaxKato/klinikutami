const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");

if (path.relative(root, output) !== "dist") {
  throw new Error("Direktori output harus berada di dalam proyek.");
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, "assets"), { recursive: true });
fs.mkdirSync(path.join(output, "scripts"), { recursive: true });

fs.copyFileSync(path.join(root, "index.html"), path.join(output, "index.html"));
fs.copyFileSync(
  path.join(root, "assets", "site.css"),
  path.join(output, "assets", "site.css"),
);
fs.cpSync(
  path.join(root, "assets", "images"),
  path.join(output, "assets", "images"),
  {
    recursive: true,
  },
);
fs.mkdirSync(path.join(output, "assets", "fonts"), { recursive: true });
for (const name of fs.readdirSync(path.join(root, "assets", "fonts"))) {
  if (name.endsWith(".woff2")) {
    fs.copyFileSync(
      path.join(root, "assets", "fonts", name),
      path.join(output, "assets", "fonts", name),
    );
  }
}
fs.copyFileSync(
  path.join(root, "assets", "site.js"),
  path.join(output, "assets", "site.js"),
);
fs.copyFileSync(
  path.join(root, "assets", "motion-licenses.txt"),
  path.join(output, "assets", "motion-licenses.txt"),
);

console.log("Berkas siap untuk Vercel di dist/");

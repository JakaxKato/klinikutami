const path = require("node:path");
const fs = require("node:fs");
const { buildSync } = require("esbuild");

buildSync({
  entryPoints: [path.join(__dirname, "site.js")],
  outfile: path.join(__dirname, "..", "assets", "site.js"),
  bundle: true,
  minify: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  legalComments: "eof",
  logLevel: "info",
});

const packages = ["motion", "framer-motion", "motion-dom", "motion-utils"];
const licenses = packages
  .map((name) => {
    const file = path.join(__dirname, "..", "node_modules", name, "LICENSE.md");
    return `${name}\n${fs.readFileSync(file, "utf8")}`;
  })
  .join("\n\n");
fs.writeFileSync(
  path.join(__dirname, "..", "assets", "motion-licenses.txt"),
  licenses,
);

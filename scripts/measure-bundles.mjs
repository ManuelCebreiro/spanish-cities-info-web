// Mide el peso real (minificado + gzip) de distintos imports de spanish-cities-info
// usando esbuild, igual que se hizo para verificar el peso del propio paquete.
// Ejecutar: node scripts/measure-bundles.mjs
import { build } from "esbuild";
import { gzipSync } from "node:zlib";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const cases = [
  {
    id: "full",
    label: "import completo",
    entry: `export { getAllCities } from 'spanish-cities-info';`,
  },
  {
    id: "comunidad-galicia",
    label: "spanish-cities-info/comunidades/galicia",
    entry: `export { cities } from 'spanish-cities-info/comunidades/galicia';`,
  },
  {
    id: "provincia-a-coruna",
    label: "spanish-cities-info/provincias/a-coruna",
    entry: `export { cities } from 'spanish-cities-info/provincias/a-coruna';`,
  },
  {
    id: "provincia-lugo",
    label: "spanish-cities-info/provincias/lugo",
    entry: `export { cities } from 'spanish-cities-info/provincias/lugo';`,
  },
];

const dir = path.join(process.cwd(), ".tmp-bundle-check");
mkdirSync(dir, { recursive: true });
const results = {};

for (const c of cases) {
  const entryPath = path.join(dir, `${c.id}.mjs`);
  writeFileSync(entryPath, c.entry);

  const out = await build({
    entryPoints: [entryPath],
    bundle: true,
    minify: true,
    format: "esm",
    platform: "browser",
    write: false,
    absWorkingDir: process.cwd(),
  });

  const code = out.outputFiles[0].contents;
  const minifiedBytes = code.length;
  const gzipBytes = gzipSync(Buffer.from(code)).length;

  results[c.id] = {
    label: c.label,
    minifiedBytes,
    gzipBytes,
  };

  console.log(
    `${c.label.padEnd(45)} min: ${(minifiedBytes / 1024).toFixed(1)} KB   gzip: ${(gzipBytes / 1024).toFixed(1)} KB`
  );
}

rmSync(dir, { recursive: true, force: true });

writeFileSync(
  path.join(process.cwd(), "src/lib/bundle-sizes.json"),
  JSON.stringify(
    { measuredAt: new Date().toISOString(), results },
    null,
    2
  ) + "\n"
);

console.log("\nGuardado en src/lib/bundle-sizes.json");

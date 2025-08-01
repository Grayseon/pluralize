import { build } from "esbuild"
import { rmSync } from "fs"
import { copy } from "esbuild-plugin-copy"

rmSync("dist", { recursive: true, force: true })

const copyPlugin = copy({
  assets: [{ from: ["./src/plurals.json"], to: ["./dist/cjs"] }],
})

const shared = {
  entryPoints: ["src/index.ts"],
  target: "node18",
  sourcemap: true,
  bundle: false,
  platform: "node",
  logLevel: "info",
  bundle: true,
}

await build({
  ...shared,
  format: "esm",
  outdir: "dist/esm",
  outExtension: { ".js": ".mjs" },
  loader: {
    ".json": "json",
  },
})

await build({
  ...shared,
  format: "cjs",
  outdir: "dist/cjs",
  outExtension: { ".js": ".cjs" },
  plugins: [copyPlugin],
})

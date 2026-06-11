// Materialize the registry theme tokens from @crashoverride/brand-tokens.
//
// The design system does not own a token canon. brand-visual (published as
// @crashoverride/brand-tokens) is the single source of truth. This script
// concatenates the package's token layers, in the order the registry theme
// expects, into src/registry/crashoverride/theme/tokens.css so that shadcn
// can ship them to consumers.
//
// Output is deterministic: LF line endings, no timestamps. Re-running on the
// same package version produces a byte-identical file, which the CI staleness
// gate relies on.
//
// Usage: node scripts/build-theme-tokens.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");
const pkgRoot = join(repoRoot, "node_modules", "@crashoverride", "brand-tokens");
const tokensDir = join(pkgRoot, "tokens");
const outFile = join(
  repoRoot,
  "src",
  "registry",
  "crashoverride",
  "theme",
  "tokens.css",
);

// Concat order matches the registry theme layering: raw scales first
// (colors, spacing, typography), then the semantic role map (which includes
// the light-mode block), then base element styles + utilities last.
// There is intentionally NO shadcn layer here: the shadcn variable bridge
// lives in globals.css, not in the materialized token canon.
const ORDER = ["colors", "spacing", "typography", "semantic", "base"];

const { version } = JSON.parse(
  readFileSync(join(pkgRoot, "package.json"), "utf8"),
);

const header =
  "/* Generated from @crashoverride/brand-tokens@" +
  version +
  " by scripts/build-theme-tokens.mjs. Do not edit. */\n";

const layers = ORDER.map((name) =>
  readFileSync(join(tokensDir, name + ".css"), "utf8"),
);

// Normalize each layer to LF and join. Each source layer already ends with a
// trailing newline, so concatenation preserves the block boundaries exactly.
const body = layers.map((css) => css.replace(/\r\n/g, "\n")).join("");

writeFileSync(outFile, header + body, "utf8");

process.stdout.write(
  "Wrote " + outFile + " from brand-tokens@" + version + "\n",
);

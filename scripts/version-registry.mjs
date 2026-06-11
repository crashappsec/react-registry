// Versioned registry path writer.
//
// Reads the major version from registry-version.json at the repo root, then
// copies every top-level public/r/<name>.json into public/r/v{M}/<name>.json.
// The unversioned path (r/<name>.json) stays as-is: it is the latest-major
// alias by construction. The versioned path (r/v{M}/<name>.json) is the
// stable pin consumers can use.
//
// Breaking-change runbook
// -----------------------
// 1. Bump "major" in registry-version.json from M to M+1.
// 2. Run `npm run registry:build` -- it will write r/ + r/v{M+1}/.
// 3. Freeze the prior major by copying public/r/v{M}/ to frozen/r/v{M}/ and
//    committing it. Frozen majors are served verbatim by pages.yml and are
//    never regenerated.
// 4. Consumers pinned to r/v{M}/ continue to work from the frozen copy;
//    consumers on r/v{M+1}/ or the unversioned alias get the new tokens.
//
// Policy: the latest two released majors are supported. Older frozen copies
// may be removed once their support window closes.
//
// Deterministic, no timestamps. ESM .mjs matching the repo's other scripts.
// Must be run after `shadcn build` (which emits public/r/*.json).
//
// Usage: node scripts/version-registry.mjs

import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

// -- Read major from registry-version.json -----------------------------------

const require = createRequire(import.meta.url);
const { major } = require(join(repoRoot, "registry-version.json"));

if (typeof major !== "number" || !Number.isInteger(major) || major < 1) {
  process.stderr.write(
    'registry-version.json must contain {"major": <positive integer>}\n',
  );
  process.exit(1);
}

// -- Verify public/r/ exists -------------------------------------------------

const registryDir = join(repoRoot, "public", "r");

let entries;
try {
  entries = readdirSync(registryDir, { withFileTypes: true });
} catch {
  process.stderr.write(
    `ERROR: ${registryDir} does not exist.\n` +
      "Run `npm run theme:build && shadcn build` before this script.\n",
  );
  process.exit(1);
}

// -- Collect top-level *.json files (skip subdirs, e.g. existing v{N}/) ------

const jsonFiles = entries
  .filter((e) => e.isFile() && e.name.endsWith(".json"))
  .map((e) => e.name);

if (jsonFiles.length === 0) {
  process.stderr.write(
    `ERROR: No *.json files found in ${registryDir}.\n` +
      "Run `npm run theme:build && shadcn build` before this script.\n",
  );
  process.exit(1);
}

// -- Create versioned subdir and copy ----------------------------------------

const versionedDir = join(registryDir, `v${major}`);
mkdirSync(versionedDir, { recursive: true });

for (const name of jsonFiles) {
  copyFileSync(join(registryDir, name), join(versionedDir, name));
}

process.stdout.write(
  `Versioned ${jsonFiles.length} files -> public/r/v${major}/ (major=${major})\n`,
);

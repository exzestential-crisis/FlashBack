// scripts/generate-barrels.ts
import fs from "fs";
import path from "path";

const ROOT_DIR = path.resolve("./src");

// Recursively scan directories
function scanDirs(dir, insideComponents = false) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Determine if this folder is a "components" folder
  const lowerName = path.basename(dir).toLowerCase();
  const isComponentsFolder = lowerName.includes("components");

  // If we're inside a components folder (or this folder itself is one), generate index
  if (insideComponents || isComponentsFolder) {
    generateIndex(dir);
  }

  // Recurse into subfolders
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // If current folder is a components folder, mark insideComponents = true for recursion
      scanDirs(fullPath, insideComponents || isComponentsFolder);
    }
  }
}

// Generate index.ts in the folder
function generateIndex(folder) {
  const files = fs
    .readdirSync(folder)
    .filter((f) => /\.(tsx?)$/.test(f)) // only .ts or .tsx files
    .filter((f) => f !== "index.ts"); // skip existing index

  if (files.length === 0) return;

  const exports = files
    .map((f) => {
      const name = f.replace(/\.(ts|tsx)$/, "");

      // Only export default if the file seems like a component (PascalCase)
      if (/^[A-Z]/.test(name)) {
        return `export { default as ${name} } from "./${name}";`;
      }
      return null;
    })
    .filter(Boolean)
    .join("\n");

  if (exports.length > 0) {
    fs.writeFileSync(path.join(folder, "index.ts"), exports);
    console.log(`Generated index.ts in ${folder}`);
  }
}

scanDirs(ROOT_DIR);

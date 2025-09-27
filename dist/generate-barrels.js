"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/generate-barrels.ts
var fs_1 = require("fs");
var path_1 = require("path");
var ROOT_DIR = path_1.default.resolve("./src");
// Recursively scan directories
function scanDirs(dir) {
    var entries = fs_1.default.readdirSync(dir, { withFileTypes: true });
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        var fullPath = path_1.default.join(dir, entry.name);
        if (entry.isDirectory()) {
            var lowerName = entry.name.toLowerCase();
            // Check for folders with "components" in the name
            if (lowerName.includes("components")) {
                generateIndex(fullPath);
            }
            // Recurse into subfolders
            scanDirs(fullPath);
        }
    }
}
// Generate index.ts in the folder
function generateIndex(folder) {
    var files = fs_1.default
        .readdirSync(folder)
        .filter(function (f) { return /\.(tsx?)$/.test(f); }) // only .ts or .tsx files
        .filter(function (f) { return f !== "index.ts"; }); // skip existing index
    if (files.length === 0)
        return;
    var exports = files
        .map(function (f) {
        var name = f.replace(/\.(ts|tsx)$/, "");
        // Only export default if the file seems like a component (PascalCase)
        if (/^[A-Z]/.test(name)) {
            return "export { default as ".concat(name, " } from \"./").concat(name, "\";");
        }
        return null;
    })
        .filter(Boolean)
        .join("\n");
    if (exports.length > 0) {
        fs_1.default.writeFileSync(path_1.default.join(folder, "index.ts"), exports);
        console.log("Generated index.ts in ".concat(folder));
    }
}
scanDirs(ROOT_DIR);

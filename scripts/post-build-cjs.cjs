// nfewizard-io/scripts/post-build-cjs.cjs
const fs = require('fs');
const path = require('path');
let resolvedGlobSync;

try {
    const { globSync } = require('glob'); // Try v10+ style
    if (typeof globSync === 'function') {
        resolvedGlobSync = globSync;
    }
} catch (e) { /* Could fail if glob is old and doesn't support this destructuring */ }

if (!resolvedGlobSync) {
    console.log("Destructured globSync not found, trying older glob import styles...");
    try {
        const globFallback = require('glob');
        if (typeof globFallback.globSync === 'function') { // v9 style
            resolvedGlobSync = globFallback.globSync;
            console.log("Using globFallback.globSync");
        } else if (typeof globFallback.sync === 'function') { // v7/v8 style
            resolvedGlobSync = globFallback.sync;
            console.log("Using globFallback.sync (aliased as resolvedGlobSync)");
        }
    } catch (e) { /* require('glob') itself could fail if not installed */ }
}

if (!resolvedGlobSync) {
    console.error("Could not find a working glob sync function. Please ensure 'glob' is installed as a devDependency. Exiting.");
    process.exit(1);
}

const cjsOutDir = path.resolve(__dirname, '..', 'dist', 'cjs');

// 1. Rename .js files to .cjs
console.log(`Looking for .js files in ${cjsOutDir} to rename to .cjs`);
const jsFiles = resolvedGlobSync('**/*.js', { cwd: cjsOutDir, absolute: true });

jsFiles.forEach(file => { /* ... your renaming logic ... */
    const newPath = file.replace(/\.js$/, '.cjs');
    try {
        fs.renameSync(file, newPath);
        console.log(`Renamed: ${file} -> ${newPath}`);
    } catch (err) {
        console.error(`Error renaming ${file} to ${newPath}:`, err);
    }
});

// 2. Update internal require paths
console.log(`\nLooking for .cjs files in ${cjsOutDir} to update internal require paths`);
const cjsFiles = resolvedGlobSync('**/*.cjs', { cwd: cjsOutDir, absolute: true });

cjsFiles.forEach(file => { /* ... your path updating logic ... */
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    const requireRegex = /require\((['"])(\.\.?\/[^"']+?)(\1)\)/g;
    content = content.replace(requireRegex, (match, quote, modulePath) => {
        if (!modulePath.endsWith('.cjs') && !modulePath.endsWith('.json')) {
            const targetPath = path.resolve(path.dirname(file), modulePath + '.cjs');
            if (fs.existsSync(targetPath)) {
                changed = true;
                // console.log(`In ${path.basename(file)}, updating require: ${modulePath} -> ${modulePath}.cjs`);
                return `require(${quote}${modulePath}.cjs${quote})`;
            }
        }
        return match;
    });
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated internal requires in: ${path.basename(file)}`);
    }
});

console.log('\nCJS post-build steps complete.');
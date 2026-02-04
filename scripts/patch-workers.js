const fs = require('fs');
const path = require('path');

const chunksDir = path.join(__dirname, '../out/_next/static/chunks');

if (!fs.existsSync(chunksDir)) {
    console.error(`Directory not found: ${chunksDir}`);
    process.exit(1);
}


// Find worker files. Usually they are the entry points or files loaded by the browser.
// Based on logs, they seem to be in _next/static/chunks/
// We can try to patch all JS files in that dir, or specifically the ones that look like workers or have specific hashes.
// However, the issue is that the *worker* itself needs to know the path to load *other* chunks.
// So we should patch the worker entry files.
// Since we don't know the exact names (hashes change), we'll patch all .js files in the chunks dir
// that look like they might be entry points or just all of them. 
// Adding the check at the top is mostly harmless if it's already set or unused.

const files = fs.readdirSync(chunksDir);
const excludedPrefixes = ['webpack-', 'main-', 'framework-', 'polyfills-'];

files.forEach(file => {
    if (file.endsWith('.js') && !excludedPrefixes.some(prefix => file.startsWith(prefix))) {
        patchFile(path.join(chunksDir, file));
    }
});

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Patch 1: Inject global variable at the top (keep this as backup/init)
    // Guard with window === undefined to ensure we only patch workers context
    const patch = 'if(typeof self !== "undefined" && typeof window === "undefined") { self.__webpack_public_path__ = "../../"; }\n';

    if (!content.includes('self.__webpack_public_path__ = "../../";')) {
        content = patch + content;
    }

    // Patch 2: Fix hardcoded webpack public path assignment
    // Next.js with assetPrefix: "./" generates 't.p="./_next/"'
    // For workers in _next/static/chunks/, we need 't.p="../../"' to go up to _next/ root.
    // We revert to "../../" because t.u includes "static/chunks/".

    // We strictly replace .p="./_next/" with .p="../../"
    const originalSize = content.length;
    // Regex matches .p="./_next/" allowing for variable name variations if possible, but exact string is safer for now based on logs.
    content = content.replace(/\.p="\.\/_next\/"/g, '.p="../../"');

    if (content.length !== originalSize || !content.includes(patch)) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched: ${path.basename(filePath)}`);
    }
}

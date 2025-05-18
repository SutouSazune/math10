const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function removePolyfillScriptTag(filePath) {
    if (!filePath.endsWith('.html')) return;

    let content = fs.readFileSync(filePath, 'utf-8');
    const oldContent = content;

    // Xóa thẻ script polyfill (kể cả có async hay không)
    content = content.replace(
        /<script\s+[^>]*src=["']https:\/\/polyfill\.io\/v3\/polyfill\.min\.js\?[^"']*["'][^>]*><\/script>\s*/g,
        ''
    );

    if (content !== oldContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✔ Removed polyfill script from: ${filePath}`);
    }
}

// Thư mục gốc chứa các "unit"
const rootDir = path.join(__dirname, 'unit');

walkDir(rootDir, removePolyfillScriptTag);

const fs = require('fs');
const path = require('path');

// === ĐOẠN SCRIPT MATHJAX ===
const mathjaxScript = `
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
`;

// === Bao công thức toán học đơn giản vào \\(...\\) ===
function wrapMath(content) {
    // Không chạm vào thẻ <script>, <style>
    return content.replace(/(?<!\\)\b([a-zA-Z0-9√\^\+\-\*/\s]+)=([a-zA-Z0-9√\^\+\-\*/\s]+)/g, (match) => {
        return `\\(${match.trim()}\\)`;
    });
}

// === Thêm MathJax nếu chưa có ===
function ensureMathJax(content) {
    if (content.includes("cdn.jsdelivr.net/npm/mathjax")) return content;

    // Thêm trước </head> nếu có
    return content.replace(/<\/head>/i, `${mathjaxScript}\n</head>`);
}

// === Xử lý 1 file HTML ===
function processHTML(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = ensureMathJax(content);
    content = wrapMath(content);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Đã xử lý:', filePath);
}

// === Duyệt toàn bộ thư mục ===
function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.html')) {
            processHTML(fullPath);
        }
    });
}

// === Bắt đầu từ thư mục 'unit' ===
walkDir(path.join(__dirname, 'unit'));

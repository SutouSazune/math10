const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'unit');

const correctFunction = `window.handleBackButtonClick = function() {
  const pathParts = window.location.pathname.split('/');
  const unitIndex = pathParts.indexOf('unit');
  const levelIndex = pathParts.indexOf('level');

  if (unitIndex !== -1 && levelIndex !== -1) {
    const unit = parseInt(pathParts[unitIndex + 1], 10);
    const level = parseInt(pathParts[levelIndex + 1], 10);
    unlockUnitLevel(unit, level + 1);
    window.location.href = '../../../../?unit' + unit + '-level' + level + '=complete';
  } else {
    window.location.href = '../../../../index.html';
  }
};`;

function fixBrokenFunctionInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Phát hiện đoạn sai có pattern '};else {' hoặc các lỗi tương tự
  const brokenPattern = /window\.handleBackButtonClick\s*=\s*function\s*\([^)]*\)\s*\{[^]*?\};\s*else\s*\{[^]*?\}/gm;

  if (brokenPattern.test(content)) {
    content = content.replace(brokenPattern, correctFunction);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Đã sửa: ${filePath}`);
  }
}

function scanAndFix(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanAndFix(fullPath);
    } else if (/^U\d+L\d+\.js$/.test(item)) {
      fixBrokenFunctionInFile(fullPath);
    }
  }
}

scanAndFix(rootDir);

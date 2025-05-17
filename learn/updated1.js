const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'unit');

// Đoạn mã cũ cần thay
const oldSnippetRegex = `
function handleBackButtonClick() {
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
}`

// Đoạn mã mới
const newSnippet = `window.handleBackButtonClick = function() {
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
}`;

// Function sẽ được thêm vào nếu chưa tồn tại
const handleFunction = `
window.handleBackButtonClick = function() {
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
}
`;

function processFile(jsFile) {
  let content = fs.readFileSync(jsFile, 'utf8');

  if (oldSnippetRegex.test(content)) {
    content = content.replace(oldSnippetRegex, `detailHTML += \`${newSnippet}\`;`);
    if (!content.includes('function handleBackButtonClick')) {
      content += '\n' + handleFunction;
    }

    fs.writeFileSync(jsFile, content, 'utf8');
    console.log(`✔ Đã thay thế trong file: ${jsFile}`);
  } else {
    console.log(`⚠ Không tìm thấy đoạn cần thay trong: ${jsFile}`);
  }
}

function traverse(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else if (entry.isFile() && /^U\d+L\d+\.js$/.test(entry.name)) {
      processFile(fullPath);
    }
  });
}

traverse(baseDir);

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, ''); // thư mục hiện tại là 'unit'

// Hàm đệ quy duyệt thư mục
function walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      walk(fullPath);
    } else if (file.isFile() && fullPath.endsWith('.js')) {
      replaceTextContent(fullPath);
    }
  });
}

function replaceTextContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Tạo bản sao lưu
    fs.writeFileSync(filePath + '.bak', content, 'utf8');

    // Thay thế tất cả .innerHTML = thành .innerHTML =
    const newContent = content.replace(/\.textContent\s*=/g, '.innerHTML =');

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Đã thay thế trong file: ${filePath}`);
  } catch (error) {
    console.error(`Lỗi xử lý file ${filePath}: ${error.message}`);
  }
}

// Bắt đầu duyệt từ thư mục gốc
walk(rootDir);

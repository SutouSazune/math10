const fs = require('fs');
const path = require('path');

// Hàm đệ quy duyệt thư mục và tìm file index.html
function findAndFixIndexFiles(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(`Lỗi đọc thư mục ${dir}:`, err);
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Đệ quy vào thư mục con
        findAndFixIndexFiles(fullPath);
      } else if (entry.isFile() && entry.name === 'index.html') {
        fixMetaTag(fullPath);
      }
    }
  });
}

// Hàm thay thế thẻ meta sai bằng đúng
function fixMetaTag(filePath) {
  fs.readFile(filePath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error(`✖ Lỗi đọc file ${filePath}:`, readErr);
      return;
    }

    const metaRegex = /<meta name="viewport" content="\\\(width=device-width\\\), \\\(initial-scale=1\\\)\.0">/;
    const correctMeta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

    if (metaRegex.test(data)) {
      const newData = data.replace(metaRegex, correctMeta);

      fs.writeFile(filePath, newData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error(`✖ Lỗi ghi file ${filePath}:`, writeErr);
        } else {
          console.log(`✔ Đã sửa: ${filePath}`);
        }
      });
    } else {
      console.log(`– Không cần sửa: ${filePath}`);
    }
  });
}

// Bắt đầu từ thư mục gốc "unit"
findAndFixIndexFiles(path.join(__dirname, 'unit'));

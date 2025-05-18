const fs = require("fs");
const path = require("path");

const targetDir = path.resolve(__dirname, "unit"); // thư mục unit, thay đổi nếu cần
const scriptLine = '<script src="../../../../template/calculator_notepad.js"></script>\n';

// Hàm đọc đệ quy và lấy danh sách file .html
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.isFile() && fullPath.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

// Hàm thêm scriptLine trước </body> nếu chưa có
function addScriptToFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  if (content.includes(scriptLine.trim())) {
    console.log(`Đã có script trong file: ${filePath}`);
    return;
  }

  const bodyCloseTag = "</body>";
  const index = content.lastIndexOf(bodyCloseTag);
  if (index === -1) {
    console.warn(`Không tìm thấy </body> trong file: ${filePath}`);
    return;
  }

  // Chèn scriptLine trước </body>
  const newContent =
    content.slice(0, index) + scriptLine + content.slice(index);

  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`Đã thêm script vào file: ${filePath}`);
}

// Thực thi
const htmlFiles = getAllHtmlFiles(targetDir);
console.log(`Tìm thấy ${htmlFiles.length} file HTML.`);

for (const file of htmlFiles) {
  addScriptToFile(file);
}

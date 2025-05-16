const fs = require('fs');
const path = require('path');

const unitDir = path.join(__dirname, 'unit');

// Hàm chuyển đổi MathJax mẫu, bạn có thể chỉnh sửa tùy ý
const mathJaxFunction = `
// Hàm chuyển đổi ký tự sang MathJax
function convertToMathJax(input) {
  return input
    .replace(/√\\(([^)]+)\\)/g, '\\\\sqrt{$1}') // căn bậc hai
    .replace(/∛\\(([^)]+)\\)/g, '\\\\sqrt[3]{$1}') // căn bậc ba
    .replace(/\\^(\\w+)/g, '^{$1}') // dấu mũ
    .replace(/_(\\w+)/g, '_{$1}') // chỉ số dưới
    .replace(/sin/g, '\\\\sin')
    .replace(/cos/g, '\\\\cos')
    .replace(/tan/g, '\\\\tan')
    .replace(/pi/g, '\\\\pi')
    .replace(/α/g, '\\\\alpha')
    .replace(/β/g, '\\\\beta')
    .replace(/γ/g, '\\\\gamma')
    .replace(/\\//g, '\\\\frac') // chú ý cần xử lý kỹ hơn phân số
    .replace(/\\*/g, '\\\\cdot');
}
`;

function addFunctionToJsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('function convertToMathJax')) {
    console.log(`Hàm đã tồn tại trong ${filePath}, bỏ qua.`);
    return;
  }

  const newContent = mathJaxFunction + '\n' + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Đã thêm hàm vào ${filePath}`);
}

function processUnitDir(unitDirPath) {
  const units = fs.readdirSync(unitDirPath, { withFileTypes: true });

  for (const unit of units) {
    if (unit.isDirectory()) {
      const levelsPath = path.join(unitDirPath, unit.name, 'level');
      if (!fs.existsSync(levelsPath)) {
        console.warn(`Không có thư mục level trong unit ${unit.name}`);
        continue;
      }

      const levels = fs.readdirSync(levelsPath, { withFileTypes: true });

      for (const level of levels) {
        if (level.isDirectory()) {
          const levelDir = path.join(levelsPath, level.name);
          const unitNum = unit.name;
          const levelNum = level.name;

          // Tên file đúng chuẩn U{unit}L{level}.js
          const expectedJsFile = `U${unitNum}L${levelNum}.js`;
          const jsFilePath = path.join(levelDir, expectedJsFile);

          if (fs.existsSync(jsFilePath)) {
            addFunctionToJsFile(jsFilePath);
          } else {
            console.warn(`Không tìm thấy file ${expectedJsFile} trong ${levelDir}`);
          }
        }
      }
    }
  }
}

processUnitDir(unitDir);

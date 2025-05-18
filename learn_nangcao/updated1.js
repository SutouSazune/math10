const fs = require('fs');
const path = require('path');

// Hàm unlockUnitLevel mới (giảm 1 level khi cập nhật vào units)
const newUnlockUnitLevel = `
function unlockUnitLevel(unit, level) {
  // Cập nhật unlockedUnitLevels
  let unlocked = localStorage.getItem('unlockedUnitLevels');
  unlocked = unlocked ? JSON.parse(unlocked) : {};

  if (!unlocked[unit]) {
    unlocked[unit] = [];
  }

  if (!unlocked[unit].includes(level)) {
    unlocked[unit].push(level);
    unlocked[unit].sort((a, b) => a - b);
  }

  localStorage.setItem('unlockedUnitLevels', JSON.stringify(unlocked));
  console.log(\`Đã mở khóa Unit \${unit} Level \${level}\`);

  // Cập nhật luôn cho units (giảm 1 level)
  let units = JSON.parse(localStorage.getItem('units'));
  if (
    units &&
    units[unit - 1] &&
    units[unit - 1].levels &&
    units[unit - 1].levels[level - 1]
  ) {
    units[unit - 1].levels[level - 1].state = 'unlock';
    localStorage.setItem('units', JSON.stringify(units));
    console.log(\`Đã cập nhật units[\${unit - 1}].levels[\${level - 1}].state = 'unlock'\`);
  }
}
`;

// Hàm tìm và thay thế trong file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Thay thế hàm unlockUnitLevel cũ bằng hàm mới
  content = content.replace(
    /function unlockUnitLevel\s*\([\s\S]*?\}\n\}/g,
    newUnlockUnitLevel.trim()
  );

  // Xóa các dòng units[...].levels[...].state = "unlock";
  content = content.replace(
    /units\s*\[\s*\d+\s*\]\.levels\s*\[\s*\d+\s*\]\.state\s*=\s*['"]unlock['"];\s*\n?/g,
    ''
  );

  // Đảm bảo chỉ gọi unlockUnitLevel(unit, level + 1) khi hoàn thành level
  // (Bạn có thể kiểm tra và chỉnh sửa thủ công nếu logic gọi hàm này khác nhau giữa các file)

  fs.writeFileSync(filePath, content, 'utf8');
}

// Đệ quy tìm tất cả file .js trong thư mục unit
function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

// Đường dẫn thư mục unit
const unitDir = path.join(__dirname, 'learn', 'unit');
processDir(unitDir);

console.log('Đã thay thế hàm unlockUnitLevel và xóa các dòng unlock trực tiếp trong thư mục unit!');  
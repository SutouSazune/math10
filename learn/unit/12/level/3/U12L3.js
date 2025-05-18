
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
  console.log(`Đã mở khóa Unit ${unit} Level ${level}`);

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
    console.log(`Đã cập nhật units[${unit - 1}].levels[${level - 1}].state = 'unlock'`);
  }
};

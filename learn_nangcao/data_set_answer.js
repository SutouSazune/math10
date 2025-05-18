const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'unit');

function processFiles() {
  fs.readdir(rootDir, (err, units) => {
    if (err) {
      console.error('Không thể đọc thư mục unit:', err);
      return;
    }
    units.forEach(unit => {
      const levelPath = path.join(rootDir, unit, 'level');
      fs.readdir(levelPath, (err2, levels) => {
        if (err2) {
          // Không có folder level hoặc lỗi, bỏ qua
          return;
        }
        levels.forEach(level => {
          const fileName = `U${unit}L${level}.js`;
          const filePath = path.join(levelPath, level, fileName);

          fs.access(filePath, fs.constants.F_OK, (err3) => {
            if (err3) {
              // File không tồn tại, bỏ qua
              return;
            }

            fs.readFile(filePath, 'utf8', (err4, data) => {
              if (err4) {
                console.error('Lỗi đọc file', filePath, err4);
                return;
              }

              // Tìm đoạn code tạo options (div class="option") trong displayQuestion
              // Cách đơn giản: tìm đoạn forEach tạo option, thêm dòng `option.dataset.answer = answer;`

              // Regex tìm đoạn forEach tạo option, rồi chèn dòng mới ngay sau dòng option.innerHTML = answer;
              // Cấu trúc đoạn đó là:
              // shuffledAnswers.forEach(answer => {
              //   const option = document.createElement('div');
              //   option.className = 'option';
              //   option.innerHTML = answer;
              //   ... (có thể chưa có dòng dataset.answer)
              //   option.addEventListener(...);
              //   ...
              // });

              // Mình sẽ dùng regex để tìm đoạn `option.innerHTML = answer;` rồi check xem đã có `option.dataset.answer` hay chưa
              // Nếu chưa có thì chèn dòng dataset.answer = answer;

              const optionInnerHtmlRegex = /option\.innerHTML\s*=\s*answer;/g;

              let newData = data;

              // Kiểm tra có chỗ nào đã có dataset.answer chưa, nếu chưa có thì thêm
              // Chúng ta sẽ thêm dòng `option.dataset.answer = answer;` ngay sau dòng option.innerHTML = answer;

              // Lặp qua tất cả vị trí option.innerHTML = answer;
              let match;
              let offset = 0;
              while ((match = optionInnerHtmlRegex.exec(newData)) !== null) {
                const insertPos = match.index + match[0].length + offset;

                // Kiểm tra sau đó có dataset.answer không trong khoảng 100 chars sau đó (tạm coi đoạn ngắn)
                const checkStr = newData.slice(insertPos, insertPos + 100);
                if (!/option\.dataset\.answer\s*=/.test(checkStr)) {
                  // Chèn dòng mới
                  const insertStr = '\n    option.dataset.answer = answer;';
                  newData = newData.slice(0, insertPos) + insertStr + newData.slice(insertPos);
                  offset += insertStr.length;
                }
              }

              // Ghi lại file
              fs.writeFile(filePath, newData, 'utf8', err5 => {
                if (err5) {
                  console.error('Lỗi ghi file', filePath, err5);
                } else {
                  console.log(`Đã thêm data-answer trong file: ${filePath}`);
                }
              });
            });
          });
        });
      });
    });
  });
}

processFiles();

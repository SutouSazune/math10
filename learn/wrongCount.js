const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'unit');

// Đoạn code thay thế nguyên bản bạn cho (copy paste đúng đoạn bạn cung cấp)
const replacementCode = `const wrongCount = new Array(questions.length).fill(0);

// Bạn thay link tương ứng bài học ở đây nhé
const questionLinks = [
  "/lesson/unit1/level1",
  "/lesson/unit1/level1",
  "/lesson/unit1/level2",
  "/lesson/unit1/level2",
  "/lesson/unit1/level3",
  "/lesson/unit1/level3",
  "/lesson/unit1/level4",
  "/lesson/unit1/level4",
  "/lesson/unit1/level5",
  "/lesson/unit1/level5"
];

function displayQuestion() {
  if (lesson.length === 0) {
    let units = JSON.parse(localStorage.getItem('units'));
    const { unit, level } = getUnitAndLevel();
    units[0].levels[1].state = 'unlock';
    localStorage.setItem('units', JSON.stringify(units));
    
    // Hiển thị bảng chi tiết kết quả
    let detailHTML = \`<h2>Kết quả bài học</h2>\`;
    detailHTML += \`<p><strong>Điểm của bạn: \${point} / \${maxPoint}</strong></p>\`;

    detailHTML += \`<h3>Tần suất sai từng câu:</h3><ul>\`;
    questions.forEach((q, i) => {
      detailHTML += \`<li>Câu \${i + 1}: sai \${wrongCount[i]} lần</li>\`;
    });
    detailHTML += \`</ul>\`;

    detailHTML += \`<h3>Bài học cần ôn tập:</h3><ul>\`;
    wrongCount.forEach((count, i) => {
      if (count > 0) {
        detailHTML += \`<li><a href="\${questionLinks[i]}" target="_blank">Ôn bài cho câu \${i + 1}</a> (sai \${count} lần)</li>\`;
      }
    });
    detailHTML += \`</ul>\`;

    const container = document.getElementById('result-detail');
    if (container) {
      container.innerHTML = detailHTML;
      container.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Bạn đã hoàn thành tất cả câu hỏi!");
      document.location.href = \`../../../../?unit\${unit}-level\${level}=complete\`;
    }

    return; // dừng hiển thị câu hỏi tiếp
  }

  const { question, answers, explain } = lesson[0];
  const correctAnswer = answers[0];
  const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

  // DOM elements
  const questionElement = document.querySelector('.question');
  const optionsContainer = document.querySelector('.options-container');
  const explainElement = document.querySelector('.explain');
  const checkButton = document.querySelector('.check-btn');
  const continueButton = document.querySelector('.continue-btn');

  // Reset UI
  questionElement.innerHTML = question;
  optionsContainer.innerHTML = '';
  explainElement.innerHTML = '';
  continueButton.classList.add('hide');

  let selectedOption = null;

  // Render options
  shuffledAnswers.forEach(answer => {
    const option = document.createElement('div');
    option.className = 'option';
    option.innerHTML = answer;
    option.addEventListener('click', () => {
      if (selectedOption) {
        selectedOption.classList.remove('selected');
      }
      option.classList.add('selected');
      selectedOption = option;
    });
    optionsContainer.appendChild(option);
  });

  loadMathJax().then(() => MathJax.typesetPromise([questionElement, optionsContainer]));

  // Setup event "Check"
  checkButton.replaceWith(checkButton.cloneNode(true));
  const newCheckButton = document.querySelector('.check-btn');

  newCheckButton.style.pointerEvents = 'auto';
  newCheckButton.addEventListener('click', () => {
    if (!selectedOption) {
      alert("Vui lòng chọn một đáp án!");
      return;
    }

    const isCorrect = selectedOption.dataset.answer === correctAnswer;
    selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      point++;
      lesson.shift();
      updateProgressBar(point, maxPoint);
      explainElement.innerHTML = explain;
    } else {
      // Tăng số lần sai câu này
      const currentQuestionIndex = questions.findIndex(q => q.question === lesson[0].question);
      if (currentQuestionIndex !== -1) {
        wrongCount[currentQuestionIndex]++;
      }
      const currentQuestion = lesson.shift();
      lesson.push(currentQuestion);
      explainElement.innerHTML = \`<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>\`;
    }

    // Phát âm thanh
    const audio = new Audio(\`../../../../assets/sounds/\${isCorrect}.mp3\`);
    audio.play();

    optionsContainer.querySelectorAll('.option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    newCheckButton.style.pointerEvents = 'none';

    continueButton.classList.remove('hide');

    loadMathJax().then(() => MathJax.typesetPromise([explainElement]));
  });
}
`;

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

              // Regex bắt toàn bộ hàm displayQuestion
              const displayQuestionRegex = /function displayQuestion\s*\([^)]*\)\s*\{[\s\S]*?\n\}/m;

              if (!displayQuestionRegex.test(data)) {
                console.warn(`Không tìm thấy hàm displayQuestion trong file ${filePath}`);
                return;
              }

              const newData = data.replace(displayQuestionRegex, replacementCode);

              fs.writeFile(filePath, newData, 'utf8', err5 => {
                if (err5) {
                  console.error('Lỗi ghi file', filePath, err5);
                } else {
                  console.log(`Đã cập nhật file: ${filePath}`);
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

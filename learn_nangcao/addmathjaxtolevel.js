const fs = require('fs');
const path = require('path');

// Thư mục gốc chứa unit
const rootDir = path.resolve(__dirname, 'unit');

// Hàm tìm tất cả file *.js trong thư mục con (đệ quy)
function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllJsFiles(filePath));
    } else if (file.isFile() && file.name.endsWith('.js')) {
      results.push(filePath);
    }
  });

  return results;
}

// Backup file trước khi sửa
function backupFile(filePath) {
  const backupPath = filePath + '.bak';
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] Đã tạo bản sao lưu: ${backupPath}`);
  } else {
    console.log(`[BACKUP] Bản sao lưu đã tồn tại: ${backupPath}`);
  }
}

// Khôi phục file từ bản backup
function restoreBackup(filePath) {
  const backupPath = filePath + '.bak';
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    console.log(`[UNDO] Đã khôi phục file từ backup: ${filePath}`);
  } else {
    console.log(`[UNDO] Không tìm thấy file backup: ${backupPath}`);
  }
}

// Thay thế đoạn code cũ trong file js để thêm đoạn load MathJax và chỉnh sửa hàm displayQuestion
function patchJsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Nếu đã patch rồi thì skip
  if (content.includes('MathJax.typesetPromise')) {
    console.log(`[SKIP] Đã patch trước đó: ${filePath}`);
    return;
  }

  backupFile(filePath); // tạo bản backup trước khi sửa

  const mathJaxScript = `
const loadMathJax = () => {
  if (window.MathJax) return Promise.resolve();
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;
    script.onload = () => {
      console.log('MathJax loaded');
      resolve();
    };
    document.head.appendChild(script);
  });
};
`;

  const displayQuestionNew = `
function displayQuestion() {
  if (lesson.length === 0) {
    let units = JSON.parse(localStorage.getItem('units'));
    const { unit, level } = getUnitAndLevel();
    units[0].levels[1].state = 'unlock';
    //units[unit - 1].levels[level - 1].state = 'unlock';
    localStorage.setItem('units', JSON.stringify(units));
    alert("Bạn đã hoàn thành tất cả câu hỏi!");
    document.location.href = \`../../../../?unit\${unit}-level\${level}=complete\`;
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

  // Track selected option
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

  // Tự động render MathJax cho câu hỏi và đáp án
  loadMathJax().then(() => MathJax.typesetPromise([questionElement, optionsContainer]));

  // Set up event for "Check" button
  checkButton.replaceWith(checkButton.cloneNode(true));
  const newCheckButton = document.querySelector('.check-btn');

  newCheckButton.style.pointerEvents = 'auto';
  newCheckButton.addEventListener('click', () => {
    if (!selectedOption) {
      alert("Vui lòng chọn một đáp án!");
      return;
    }

    const isCorrect = selectedOption.innerHTML === correctAnswer;
    selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      point++;
      lesson.shift();
      updateProgressBar(point, maxPoint);
      explainElement.innerHTML = explain;
    } else {
      const currentQuestion = lesson.shift();
      lesson.push(currentQuestion);
      explainElement.innerHTML = \`<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>\`;
    }

    // Sound Effect
    const audio = new Audio(\`../../../../assets/sounds/\${isCorrect}.mp3\`);
    audio.play();

    // Disable options and check button
    optionsContainer.querySelectorAll('.option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    newCheckButton.style.pointerEvents = 'none';

    // Show continue button
    continueButton.classList.remove('hide');

    // Render MathJax cho phần giải thích
    loadMathJax().then(() => MathJax.typesetPromise([explainElement]));
  });
}
`;

  // Thay thế hàm displayQuestion bằng đoạn mới
  const regexDisplayQuestion = /function\s+displayQuestion\s*\([^)]*\)\s*\{[^]*?\n\}/m;
  if (regexDisplayQuestion.test(content)) {
    content = content.replace(regexDisplayQuestion, displayQuestionNew);
  } else {
    content += '\n\n' + displayQuestionNew;
  }

  // Thêm đoạn loadMathJax ở đầu file
  content = mathJaxScript + '\n' + content;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[PATCHED] ${filePath}`);
}

// MAIN
const jsFiles = getAllJsFiles(rootDir);

// Nếu có tham số "undo", phục hồi file từ backup
if (process.argv[2] === 'undo') {
  console.log('Bắt đầu khôi phục file từ bản backup...');
  jsFiles.forEach(restoreBackup);
  console.log('Hoàn thành khôi phục tất cả file.');
  process.exit(0);
}

// Thực hiện patch file
jsFiles.forEach(patchJsFile);

console.log('Hoàn thành patch tất cả các file .js.');

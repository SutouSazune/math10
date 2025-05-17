
function unlockUnitLevel(unit, level) {
  let unlocked = localStorage.getItem('unlockedUnitLevels');
  unlocked = unlocked ? JSON.parse(unlocked) : {};

  if (!unlocked[unit]) {
    unlocked[unit] = [];
  }

  if (!unlocked[unit].includes(level)) {
    unlocked[unit].push(level);
    unlocked[unit].sort((a,b) => a-b);
  }

  localStorage.setItem('unlockedUnitLevels', JSON.stringify(unlocked));
  console.log(`Đã mở khóa Unit ${unit} Level ${level}`);
}



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

import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Một mảnh đất hình chữ nhật có diện tích 360 m². Nếu tăng chiều rộng 3 m và giảm chiều dài 4 m thì diện tích mảnh đất không đổi. Hãy lập phương trình bậc hai và giải bài toán để tìm chiều dài và chiều rộng ban đầu của mảnh đất.
        `,
        answers: [
            `Chiều dài = 18 m, Chiều rộng = 20 m`,
            `Chiều dài = 20 m, Chiều rộng = 18 m`,
            `Chiều dài = 15 m, Chiều rộng = 24 m`,
            `Chiều dài = 25 m, Chiều rộng = 15 m`,
        ],
        explain: `
            Gọi chiều dài ban đầu là x m, chiều rộng ban đầu là y m. <br><br>
            Ta có: x * y = 360 (diện tích ban đầu). <br><br>
            Sau khi thay đổi, chiều dài trở thành (x - 4) và chiều rộng trở thành (y + 3). Diện tích không thay đổi, ta có: <br><br>
            (x - 4)(y + 3) = 360. <br><br>
            Từ đó, ta lập phương trình bậc hai và giải để tìm x và y.
        `
    },
    {
        question: `
            Một người lái xe đi từ A đến B với quãng đường 120 km. Nếu tốc độ của anh ta giảm 10 km/h, thời gian đi từ A đến B sẽ tăng thêm 1 giờ. Hãy lập phương trình bậc hai để tính tốc độ ban đầu của người lái xe.
        `,
        answers: [
            `Tốc độ ban đầu = 40 km/h`,
            `Tốc độ ban đầu = 50 km/h`,
            `Tốc độ ban đầu = 60 km/h`,
            `Tốc độ ban đầu = 30 km/h`,
        ],
        explain: `
            Gọi tốc độ ban đầu của người lái xe là x km/h. <br><br>
            Thời gian để đi từ A đến B với tốc độ x là: 120/x giờ. <br><br>
            Nếu giảm tốc độ 10 km/h, thời gian sẽ tăng thêm 1 giờ, tức là thời gian sẽ là 120/(x - 10) giờ. <br><br>
            Ta có phương trình: 120/(x - 10) - 120/x = 1. <br><br>
            Giải phương trình để tìm x.
        `
    },
    {
        question: `
            Trong một bài kiểm tra, điểm số của các học sinh được tính theo công thức: điểm = (số câu trả lời đúng)² - 4. Nếu một học sinh có điểm số bằng 36, hãy lập phương trình bậc hai để tìm số câu trả lời đúng của học sinh đó.
        `,
        answers: [
            `Số câu trả lời đúng = 8`,
            `Số câu trả lời đúng = 7`,
            `Số câu trả lời đúng = 6`,
            `Số câu trả lời đúng = 9`,
        ],
        explain: `
            Gọi số câu trả lời đúng là x. <br><br>
            Theo công thức, điểm số = x² - 4. <br><br>
            Ta có phương trình: x² - 4 = 36. <br><br>
            Giải phương trình để tìm x.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];
//mod
function getUnitAndLevel() {
    const pathParts = window.location.pathname.split('/');
    const unitIndex = pathParts.indexOf('unit');
    const levelIndex = pathParts.indexOf('level');

    if (unitIndex !== -1 && levelIndex !== -1) {
        const unit = parseInt(pathParts[unitIndex + 1], 10); // Get the unit number
        const level = parseInt(pathParts[levelIndex + 1], 10); // Get the level number
        return { unit, level };
    }

    return { unit: null, level: null }; // Return null if not found
}
//---

const wrongCount = new Array(questions.length).fill(0);

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
  document.getElementById('result-overlay').style.display = 'flex';
    let units = JSON.parse(localStorage.getItem('units'));
    const { unit, level } = getUnitAndLevel();
    units[0].levels[1].state = 'unlock';
    localStorage.setItem('units', JSON.stringify(units));
    
    // Hiển thị bảng chi tiết kết quả
    let detailHTML = `<h2>Kết quả bài học</h2>`;
      detailHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <p style="margin: 0;"><strong>Điểm của bạn: ${point} / ${maxPoint}</strong></p>
          <div class="rank-large rank-${rankclass}">${rank}</div>
        </div>
        <p>Bạn đã làm sai tổng cộng <strong>${totalWrong}</strong> lần.</p>
        <details><summary><strong>Chi tiết số lần sai từng câu</strong></summary><ul>`;
      questions.forEach((_, i) => {
        detailHTML += `<li>Câu ${i + 1}: sai ${wrongCount[i]} lần</li>`;
      });
      detailHTML += `</ul></details><h3>Bài học cần ôn tập:</h3><ul>`;
      wrongCount.forEach((count, i) => {
        if (count > 0) {
          detailHTML += `<li><a href="${questionLinks[i]}" target="_blank">Ôn bài câu ${i + 1}</a> (sai ${count} lần)</li>`;
        }
      });
      detailHTML += `
<div class="back-button-container">
    <button onclick="handleBackButtonClick()">← Quay về</button>
</div>`;

    const container = document.getElementById('result-detail');
    if (container) {
      container.innerHTML = detailHTML;
      container.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Bạn đã hoàn thành tất cả câu hỏi!");
      document.location.href = `../../../../?unit${unit}-level${level}=complete`;
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
    option.dataset.answer = answer;
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
      explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
    }

    // Phát âm thanh
    const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
    audio.play();

    optionsContainer.querySelectorAll('.option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    newCheckButton.style.pointerEvents = 'none';

    continueButton.classList.remove('hide');

    loadMathJax().then(() => MathJax.typesetPromise([explainElement]));
  });
}



function setContinueButton() {
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);
}

// Initialize quiz
setContinueButton();
displayQuestion();


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
}

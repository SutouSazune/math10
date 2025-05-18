
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

import { updateProgressBar, fraction } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải phương trình sau: x(x - 2) = 0
        `,
        answers: [
            `x = 0 hoặc x = 2`,
            `x = 0`,
            `x = 2`,
            `x = 1`,
        ],
        explain: `
            x(x - 2) = 0<br><br>
            Suy ra x = 0 hoặc x - 2 = 0<br><br>
            Do đó x = 0 hoặc x = 2.<br><br>
            Vậy phương trình đã cho có nghiệm x = 0 hoặc x = 2.
        `
    }, {
        question: `
            Giải phương trình sau: (x² - 4) + x(x - 2) = 0
        `,
        answers: [
            `x = 2 và x = -1`,
            `x = 2 và x = -3`,
            `x = 1`,
            `x = -1 và x = 3`,
        ],
        explain: `
            (x2 - 4) + x(x - 2) = 0<br><br>
            (x - 2)(x + 2) + x(x - 2) = 0<br><br>
            (x - 2)(x + 2 + x) = 0<br><br>
            (x - 2)(2x + 2) = 0.<br><br>
            Ta giải hai phương trình sau:<br><br>
            ⦁ x - 2 = 0, suy ra x = 2.<br><br>
            ⦁ 2x + 2 = 0 hay 2x = -2, suy ra x = -1.<br><br>
            Vậy phương trình đã cho có nghiệm là x = 2 và x = -1.
        `
    }, {
        question: `
            Bác An có một mảnh đất hình chữ nhật với chiều dài 14 m và 
            chiều rộng 12 m. Bác dự định xây nhà trên mảnh đất đó và dành 
            một phần diện tích đất để làm sân vườn như Hình 2.2. Biết diện 
            tích đất làm nhà là 100 m2. Hỏi x bằng bao nhiêu mét?<br>
            <div class="container-img">
                <img src="assets/images/img1.png">
            </div>
        `,
        answers: [
            `2`,
            `3`,
            `4`,
            `5`,
        ],
        explain: `
            Chiều dài của phần đất làm nhà là: 14 - (x + 2) = 12 - x(m). 
            Điều kiện x < 12.<br><br>
            Chiều rộng của phần đất làm nhà là: 12 - x(m).<br><br>
            Diện tích đất làm nhà là: (12 - x)² (m²).<br><br>
            Theo bài, diện tích đất làm nhà là 100m² nên ta có phương trình:<br><br>
            (12 - x)² = 100. (*)<br><br>
            Giải phương trình (*):<br><br>
            (12 - x)² - 10² = 0<br><br>
            (12 - x - 10)(12 - x + 10) = 0<br><br>
            (2 - x)(22 - x) = 0<br><br>
            Suy ra 2 - x = 0 hoặc 22 - x = 0<br><br>
            Do đó x = 2 hoặc x = 22.<br><br>
            Ta thấy x = 2 thỏa mãn điều kiện x < 12.<br><br>
            Vậy x = 2.<br><br>
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


window.handleBackButtonClick = function() {
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
};


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
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 5cm và PO = 7cm.
        `,
        answers: [
            `PA = PB = 6cm`,
            `PA = PB = 4cm`,
            `PA = PB = 3cm`,
            `PA = PB = 5.5cm`,
        ],
        explain: `
            - Khi biết R = 5cm và PO = 7cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(7² - 5²) = √(49 - 25) = √24 ≈ 4.9cm. Vậy PA ≈ PB ≈ 5cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 6cm và PO = 10cm.
        `,
        answers: [
            `PA = PB = 8cm`,
            `PA = PB = 7cm`,
            `PA = PB = 6.5cm`,
            `PA = PB = 9cm`,
        ],
        explain: `
            - Khi biết R = 6cm và PO = 10cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(10² - 6²) = √(100 - 36) = √64 = 8cm. Vậy PA = PB = 8cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 2cm và PO = 5cm.
        `,
        answers: [
            `PA = PB = 3cm`,
            `PA = PB = 4cm`,
            `PA = PB = 3.5cm`,
            `PA = PB = 2.5cm`,
        ],
        explain: `
            - Khi biết R = 2cm và PO = 5cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(5² - 2²) = √(25 - 4) = √21 ≈ 4.58cm. Vậy PA ≈ PB ≈ 4.6cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 3cm và PO = 8cm.
        `,
        answers: [
            `PA = PB = 7cm`,
            `PA = PB = 6cm`,
            `PA = PB = 5cm`,
            `PA = PB = 4cm`,
        ],
        explain: `
            - Khi biết R = 3cm và PO = 8cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(8² - 3²) = √(64 - 9) = √55 ≈ 7.42cm. Vậy PA ≈ PB ≈ 7cm.
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

    const totalWrong = wrongCount.reduce((sum, val) => sum + val, 0);
    let rank = 'S';
    let rankclass = 'S';
    if (totalWrong >= 1) rank = 'A+';
    if (totalWrong >= 2) rank = 'A';
    if (totalWrong >= 4) rank = 'B+';
    if (totalWrong >= 6) rank = 'B';
    if (totalWrong >= 8) rank = 'C+';
    if (totalWrong >= 10) rank = 'C';
    if (totalWrong >= 12) rank = 'F';
    if (rank === 'S') rankclass = 'S';
    if (rank === 'A+') rankclass = 'Aplus';
    if (rank === 'A') rankclass = 'A';
    if (rank === 'B+') rankclass = 'Bplus';
    if (rank === 'B') rankclass = 'B';
    if (rank === 'C+') rankclass = 'Cplus';
    if (rank === 'C') rankclass = 'C';
    if (rank === 'F') rankclass = 'F';

    let detailHTML = `<h2>Kết quả bài học</h2>`;
    detailHTML += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <p style="margin: 0;"><strong>Điểm của bạn: ${point} / ${maxPoint}</strong></p>
        <div class="rank-large rank-${rankclass}" title="Xếp hạng của bạn">${rank}</div>
      </div>`;

    detailHTML += `<p>Bạn đã làm sai tổng cộng <strong>${totalWrong}</strong> lần.</p>`;

    detailHTML += `
      <details>
        <summary><strong>Chi tiết số lần sai từng câu</strong></summary>
        <ul>`;
    questions.forEach((q, i) => {
      detailHTML += `<li>Câu ${i + 1}: sai ${wrongCount[i]} lần</li>`;
    });
    detailHTML += `</ul></details>`;

    detailHTML += `<h3>Bài học cần ôn tập:</h3><ul>`;
    wrongCount.forEach((count, i) => {
      if (count > 0) {
        detailHTML += `<li><a href="${questionLinks[i]}" target="_blank">Ôn bài cho câu ${i + 1}</a> (sai ${count} lần)</li>`;
      }
    });
    detailHTML += `
  <div class="back-button-container">
    <button onclick="window.location.href='../../../../index.html'">← Quay về</button>
  </div>
</ul>`;

    const container = document.getElementById('result-detail');
    if (container) {
      container.innerHTML = detailHTML;
      container.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Bạn đã hoàn thành tất cả câu hỏi!");
      document.location.href = `../../../../?unit${unit}-level${level}=complete`;
    }

    return;
  }

  const { question, answers, explain } = lesson[0];
  const correctAnswer = answers[0];
  const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

  const questionElement = document.querySelector('.question');
  const optionsContainer = document.querySelector('.options-container');
  const explainElement = document.querySelector('.explain');
  const checkButton = document.querySelector('.check-btn');
  const continueButton = document.querySelector('.continue-btn');

  questionElement.innerHTML = question;
  optionsContainer.innerHTML = '';
  explainElement.innerHTML = '';
  continueButton.classList.add('hide');

  let selectedOption = null;

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
      const currentQuestionIndex = questions.findIndex(q => q.question === lesson[0].question);
      if (currentQuestionIndex !== -1) {
        wrongCount[currentQuestionIndex]++;
      }
      const currentQuestion = lesson.shift();
      lesson.push(currentQuestion);
      explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
    }

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

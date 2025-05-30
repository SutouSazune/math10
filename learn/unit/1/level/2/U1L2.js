
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

import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x + y = 5</p>
            <p class="highlight red indent">3x - y = 4</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; -1)",
            "(4; -2)",
            "(2; 1)",
            "(1; 2)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được 2x + y + 3x - y = 5 + 4 hay 5x = 9.<br>
            Suy ra x = 9/5.<br>
            Thế x = 9/5 vào phương trình đầu tiên, ta có 2(9/5) + y = 5 hay y = ...<br>
            Đáp án là (3; -1).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + 2y = 7</p>
            <p class="highlight red indent">3x - 4y = -5</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 2)",
            "(1; 3)",
            "(2; 4)",
            "(-1; 5)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 3, ta có:<br>
            <p class="highlight red indent">3x + 6y = 21</p>
            Cộng với phương trình thứ hai:<br>
            3x + 6y + 3x - 4y = 21 - 5.<br>
            Đáp án là (3; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + y = 5</p>
            <p class="highlight red indent">x - y = 3</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 1)",
            "(3; 2)",
            "(2; 3)",
            "(1; 4)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            x + y + x - y = 5 + 3 hay 2x = 8 ⟹ x = 4.<br>
            Thế x = 4 vào phương trình thứ nhất, ta được 4 + y = 5 ⟹ y = 1.<br>
            Vậy nghiệm là (4; 1).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x + y = 9</p>
            <p class="highlight red indent">3x - y = 6</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 3)",
            "(2; 5)",
            "(1; 7)",
            "(4; 1)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            2x + y + 3x - y = 9 + 6 hay 5x = 15 ⟹ x = 3.<br>
            Thế x = 3 vào phương trình thứ nhất, ta được 2(3) + y = 9 ⟹ y = 3.<br>
            Vậy nghiệm là (3; 3).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">4x + 3y = 18</p>
            <p class="highlight red indent">2x - 3y = 6</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 2)",
            "(2; 1)",
            "(1; 3)",
            "(4; 0)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            4x + 3y + 2x - 3y = 18 + 6 hay 6x = 24 ⟹ x = 4.<br>
            Thế x = 4 vào phương trình đầu tiên, ta được 4(4) + 3y = 18 ⟹ y = 2.<br>
            Vậy nghiệm là (3; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">5x + y = 20</p>
            <p class="highlight red indent">3x - y = 10</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(5; -5)",
            "(4; -2)",
            "(3; -1)",
            "(2; 0)"
        ],
        explain: `
            Cộng từng vế của hai phương trình ta được:<br>
            5x + y + 3x - y = 20 + 10 hay 8x = 30 ⟹ x = 5.<br>
            Thế x = 5 vào phương trình đầu tiên, ta được 5(5) + y = 20 ⟹ y = -5.<br>
            Vậy nghiệm là (5; -5).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">3x + 2y = 12</p>
            <p class="highlight red indent">2x - y = 5</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 0)",
            "(3; 1)",
            "(2; 2)",
            "(1; 3)"
        ],
        explain: `
            Nhân phương trình thứ hai với 2, ta được:<br>
            <p class="highlight red indent">4x - 2y = 10</p>
            Cộng với phương trình đầu:<br>
            3x + 2y + 4x - 2y = 12 + 10 hay 7x = 22 ⟹ x = 4.<br>
            Thế x vào, tính ra y. Đáp án là (4; 0).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x + 3y = 10</p>
            <p class="highlight red indent">2x - y = 4</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(4; 2)",
            "(3; 1)",
            "(2; 3)",
            "(1; 4)"
        ],
        explain: `
            Nhân phương trình đầu với 2, ta được:<br>
            <p class="highlight red indent">2x + 6y = 20</p>
            Cộng với phương trình thứ hai:<br>
            2x + 6y + 2x - y = 20 + 4.<br>
            Kết quả x và y là số nguyên. Đáp án là (4; 2).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">3x + y = 9</p>
            <p class="highlight red indent">4x - 2y = 8</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(2; 3)",
            "(1; 4)",
            "(3; 2)",
            "(2; 1)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 2, ta được:<br>
            <p class="highlight red indent">6x + 2y = 18</p>
            Cộng với phương trình thứ hai:<br>
            6x + 2y + 4x - 2y = 18 + 8.<br>
            Giải ra x và y. Đáp án là (2; 3).
        `
    },
    {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">x - 2y = -1</p>
            <p class="highlight red indent">3x + y = 14</p>
            bằng phương pháp cộng đại số
        `,
        answers: [
            "(3; 5)",
            "(2; 4)",
            "(4; 3)",
            "(1; 6)"
        ],
        explain: `
            Nhân phương trình đầu tiên với 3, ta được:<br>
            <p class="highlight red indent">3x - 6y = -3</p>
            Cộng với phương trình thứ hai:<br>
            3x - 6y + 3x + y = -3 + 14.<br>
            Kết quả là (3; 5).
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
  "https://www.youtube.com/watch?v=IUkl4CPPNqs",
  "https://chatgpt.com/c/682718c6-8534-8009-9e45-02af58bac928",
  "/lesson/unit1/level1",
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


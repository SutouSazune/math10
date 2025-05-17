
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
            Tứ giác ABCD nội tiếp trong một đường tròn, biết góc A = 60°, góc C = 120°. Hỏi số đo của góc B? <br><br>
        `,
        answers: [
            `Góc B = 90°`,
            `Góc B = 120°`,
            `Góc B = 60°`,
            `Góc B = 150°`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180°. <br>
            - Vì góc A = 60° và góc C = 120°, nên góc B = 180° - 120° = 90°. <br><br>
        `,
    },
    {
        question: `
            Trong tam giác vuông ABC, góc A = 30° và cạnh đối diện góc A là 5 cm. Tính độ dài cạnh huyền của tam giác. <br><br>
        `,
        answers: [
            `Cạnh huyền = 10 cm`,
            `Cạnh huyền = 8 cm`,
            `Cạnh huyền = 5√3 cm`,
            `Cạnh huyền = 5/√3 cm`,
        ],
        explain: `
            - Trong tam giác vuông, ta sử dụng công thức sin để tính cạnh huyền: sin(30°) = đối/huyền. <br>
            - sin(30°) = 1/2, vậy 1/2 = 5/huyền. <br>
            - Suy ra cạnh huyền = 10 cm. <br><br>
        `,
    },
    {
        question: `
            Trong một tứ giác ABCD nội tiếp, biết góc A = 45°, góc B = 90°. Hỏi góc C là bao nhiêu? <br><br>
        `,
        answers: [
            `Góc C = 135°`,
            `Góc C = 45°`,
            `Góc C = 90°`,
            `Góc C = 60°`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180°. <br>
            - Góc A = 45° và góc B = 90°, nên góc C = 180° - 45° = 135°. <br><br>
        `,
    },
    {
        question: `
            Trong tam giác vuông ABC, với góc B = 90°, cạnh AB = 6 cm và cạnh BC = 8 cm. Tính độ dài cạnh AC. <br><br>
        `,
        answers: [
            `Cạnh AC = 10 cm`,
            `Cạnh AC = 12 cm`,
            `Cạnh AC = 14 cm`,
            `Cạnh AC = 7 cm`,
        ],
        explain: `
            - Trong tam giác vuông, ta sử dụng định lý Pythagoras: AC² = AB² + BC². <br>
            - AC² = 6² + 8² = 36 + 64 = 100. <br>
            - AC = √100 = 10 cm. <br><br>
        `,
    },
    {
        question: `
            Tính diện tích của một hình tròn có bán kính 4 cm. (Làm tròn kết quả đến hàng đơn vị). <br><br>
        `,
        answers: [
            `Diện tích = 50 cm²`,
            `Diện tích = 60 cm²`,
            `Diện tích = 70 cm²`,
            `Diện tích = 40 cm²`,
        ],
        explain: `
            - Diện tích của hình tròn được tính theo công thức: S = πr². <br>
            - Với bán kính r = 4 cm, ta có: S = π(4)² ≈ 50,27 cm². Làm tròn đến hàng đơn vị, ta có diện tích = 50 cm². <br><br>
        `,
    }        
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];


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

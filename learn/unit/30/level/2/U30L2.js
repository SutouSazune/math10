
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
        question: `Khẳng định nào sau đây là đúng?`,
        answers: [
            `Góc nội tiếp có số đo bằng một nửa số đo cung bị chắn.`,
            `Góc nội tiếp có số đo bằng số đo cung bị chắn.`,
            `Góc có hai cạnh chứa các dây cung của đường tròn là góc nội tiếp 
            đường tròn đó.`,
            `Góc có đỉnh nằm trên đường tròn là góc nội tiếp đường tròn đó.`,
        ],
        explain: `
            Trong một đường tròn hoặc hai đường tròn bằng nhau: <br><br>
            ⦁ Góc nội tiếp có số đo bằng nửa số đo cung bị chắn. Do đó 
            phương án A là sai và phương án C là đúng. <br><br>
            ⦁ Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó nên phương án B và D là sai. <br><br>
        `
    }, {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Khẳng định nào sau đây là đúng? <br><br>
        `,
        answers: [
            `Tổng số đo hai góc đối diện bằng 180⁰.`,
            `Tổng số đo hai góc đối diện bằng 90⁰.`,
            `Mỗi góc của tứ giác bằng một nửa số đo cung bị chắn.`,
            `Các góc đối diện của tứ giác bằng nhau.`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện luôn bằng 180⁰. Do đó, phương án A là đúng. <br><br>
            - Các phương án khác không đúng vì không phù hợp với tính chất của tứ giác nội tiếp. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo cung bị chắn bởi góc D là 120⁰. Tính số đo góc D. <br><br>
        `,
        answers: [
            `D = 60⁰`,
            `D = 90⁰`,
            `D = 120⁰`,
            `D = 45⁰`,
        ],
        explain: `
            - Số đo góc nội tiếp D bằng một nửa số đo cung bị chắn bởi góc đó. <br><br>
            - Do cung bị chắn bởi góc D có số đo 120⁰, ta có D = 120⁰ / 2 = 60⁰. Do đó, phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo góc A = 75⁰, số đo góc C bằng bao nhiêu? <br><br>
        `,
        answers: [
            `C = 75⁰`,
            `C = 105⁰`,
            `C = 85⁰`,
            `C = 135⁰`,
        ],
        explain: `
            - Trong tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180⁰. <br><br>
            - Do đó, nếu A = 75⁰, ta có C = 180⁰ - 75⁰ = 105⁰. Phương án B là đúng. <br><br>
        `,
    },
    {
        question: `
            Cho tứ giác ABCD nội tiếp trong một đường tròn. Biết số đo cung AC = 240⁰, tính số đo góc B. <br><br>
        `,
        answers: [
            `B = 60⁰`,
            `B = 120⁰`,
            `B = 30⁰`,
            `B = 90⁰`,
        ],
        explain: `
            - Số đo góc B bằng một nửa số đo cung bị chắn bởi góc đó. <br><br>
            - Do cung bị chắn bởi góc B có số đo 240⁰, ta có B = 240⁰ / 2 = 120⁰. Do đó, phương án B là đúng. <br><br>
        `,
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

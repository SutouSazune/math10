
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
            Tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 4m và 8m.
        `,
        answers: [
            `S = 48π m²`,
            `S = 32π m²`,
            `S = 50π m²`,
            `S = 64π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 8m và r = 4m, do đó diện tích là S = π(8² - 4²) = π(64 - 16) = 48π m².
        `
    }, {
        question: `
            Cho hai đường tròn đồng tâm có bán kính lần lượt là 2m và 6m. Tính diện tích hình vành khuyên.
        `,
        answers: [
            `S = 32π m²`,
            `S = 24π m²`,
            `S = 16π m²`,
            `S = 20π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 6m và r = 2m, do đó diện tích là S = π(6² - 2²) = π(36 - 4) = 32π m².
        `
    }, {
        question: `
            Tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 7m và 9m.
        `,
        answers: [
            `S = 40π m²`,
            `S = 56π m²`,
            `S = 72π m²`,
            `S = 18π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 9m và r = 7m, do đó diện tích là S = π(9² - 7²) = π(81 - 49) = 32π m².
        `
    }, {
        question: `
            Cho hai đường tròn đồng tâm có bán kính lần lượt là 5m và 12m. Hãy tính diện tích hình vành khuyên giữa hai đường tròn này.
        `,
        answers: [
            `S = 119π m²`,
            `S = 85π m²`,
            `S = 60π m²`,
            `S = 170π m²`,
        ],
        explain: `
            - Diện tích hình vành khuyên được tính bằng công thức S = π(R² - r²), trong đó R là bán kính của đường tròn ngoài và r là bán kính của đường tròn trong.
            - Ở đây, R = 12m và r = 5m, do đó diện tích là S = π(12² - 5²) = π(144 - 25) = 119π m².
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

function displayQuestion() {
  if (lesson.length === 0) {
    let units = JSON.parse(localStorage.getItem('units'));
    const { unit, level } = getUnitAndLevel();
    units[0].levels[1].state = 'unlock';
    //units[unit - 1].levels[level - 1].state = 'unlock';
    localStorage.setItem('units', JSON.stringify(units));
    alert("Bạn đã hoàn thành tất cả câu hỏi!");
    document.location.href = `../../../../?unit${unit}-level${level}=complete`;
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
      explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
    }

    // Sound Effect
    const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
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


function setContinueButton() {
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);
}

// Initialize quiz
setContinueButton();
displayQuestion();

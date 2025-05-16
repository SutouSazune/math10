
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
            Xét góc C của tam giác ABC vuông tại A (H.4.3). Hãy chỉ ra cạnh đối và cạnh kề của góc C.
        `,
        answers: [
            `Cạnh đối: AB<br>
             Cạnh kề: AC`,
            `Cạnh đối: AC<br>
             Cạnh kề: AB`,
            `Cạnh đối: BC<br>
             Cạnh kề: AC`,
            `Cạnh đối: AB<br>
             Cạnh kề: BC`,
        ],
        explain: ``
    }, {
        question: `
            Cho tam giác ABC vuông tại A có AB = 5 cm, AC = 12 cm. Hãy tính sin(B)
        `,
        answers: [
            `12/13`,
            `5/13`,
            `5/12`,
            `13/12`,
        ],
        explain: `
            Ta có tam giác vuông ABC tại A, với AB = 5 cm và AC = 12 cm. Để tính sin(B), ta cần tìm BC (cạnh huyền). 
            Áp dụng định lý Pythagoras: BC² = AB² + AC² = 5² + 12² = 25 + 144 = 169. <br>
            Do đó BC = √169 = 13. <br>
            Sin(B) = đối/ huyền = AC/BC = 12/13.
        `
    }, {
        question: `
            Cho tam giác vuông ABC tại A có AB = 9 cm, AC = 12 cm. Hãy tính cos(C)
        `,
        answers: [
            `3/5`,
            `9/15`,
            `12/15`,
            `5/12`,
        ],
        explain: `
            Ta có tam giác vuông ABC tại A, với AB = 9 cm và AC = 12 cm. Để tính cos(C), ta cần tìm BC (cạnh huyền). 
            Áp dụng định lý Pythagoras: BC² = AB² + AC² = 9² + 12² = 81 + 144 = 225. <br>
            Do đó BC = √225 = 15. <br>
            Cos(C) = kề/ huyền = AB/BC = 9/15 = 3/5.
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

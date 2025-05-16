
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
            Cho đường tròn (O) với các điểm A, B, C nằm trên đường tròn. Số đo của góc nội tiếp ∠ABC là 40°. Hãy tính số đo của cung AC.<br><br>
            Áp dụng định lý góc nội tiếp để giải bài toán.
        `,
        answers: [
            `80°`,
            `100°`,
            `120°`,
            `160°`
        ],
        explain: `
            Theo định lý góc nội tiếp, số đo của góc nội tiếp bằng một nửa số đo của cung mà góc đó chắn. <br><br> 
            Do đó, cung AC có số đo là 2 * 40° = 80°.
        `
    },
    {
        question: `
            Trong đường tròn (O), góc nội tiếp ∠ABC chắn cung AB có số đo 50°. Hãy tính số đo của góc nội tiếp ∠DEF chắn cung DE nếu hai cung AB và DE có số đo bằng nhau.<br><br>
            Hãy áp dụng định lý góc nội tiếp để giải bài toán.
        `,
        answers: [
            `50°`,
            `100°`,
            `80°`,
            `60°`
        ],
        explain: `
            Do hai cung AB và DE có số đo bằng nhau, và góc nội tiếp chắn cung AB có số đo là 50°, <br><br> 
            Ta suy ra góc nội tiếp ∠DEF chắn cung DE cũng có số đo là 50°.
        `
    },
    {
        question: `
            Cho đường tròn (O) với các điểm A, B, C, D nằm trên đường tròn sao cho ∠ABC là góc nội tiếp. Biết rằng số đo góc ∠ABC là 60°. Hãy tính số đo cung AD.<br><br>
            Áp dụng định lý góc nội tiếp để giải bài toán.
        `,
        answers: [
            `120°`,
            `150°`,
            `180°`,
            `200°`
        ],
        explain: `
            Áp dụng định lý góc nội tiếp, ta biết rằng số đo góc ∠ABC bằng một nửa số đo của cung AD. <br><br>
            Do đó, số đo cung AD là 2 * 60° = 120°.
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

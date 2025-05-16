
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
            Trong một cuộc khảo sát về việc lựa chọn các món ăn yêu thích trong bữa ăn của học sinh, kết quả thu được như sau: <br><br>
            Món ăn A: 30 học sinh <br><br>
            Món ăn B: 15 học sinh <br><br>
            Món ăn C: 5 học sinh <br><br>
            Hãy tính xác suất một học sinh được chọn ngẫu nhiên sẽ chọn món ăn A.
        `,
        answers: [
            `0.6`,
            `0.5`,
            `0.7`,
            `0.4`,
        ],
        explain: `
            Xác suất một học sinh được chọn ngẫu nhiên sẽ chọn món ăn A = Số học sinh chọn món A / Tổng số học sinh. <br><br>
            Tổng số học sinh là 30 + 15 + 5 = 50. <br><br>
            Xác suất = 30 / 50 = 0.6. <br><br>
        `
    },
    {
        question: `
            Trong một cuộc khảo sát về số lượng học sinh thích các môn thể thao khác nhau, kết quả thu được như sau: <br><br>
            Môn bóng đá: 20 học sinh <br><br>
            Môn bóng rổ: 10 học sinh <br><br>
            Môn cầu lông: 5 học sinh <br><br>
            Hãy tính xác suất một học sinh được chọn ngẫu nhiên sẽ thích môn bóng rổ.
        `,
        answers: [
            `0.2`,
            `0.1`,
            `0.4`,
            `0.3`,
        ],
        explain: `
            Xác suất một học sinh được chọn ngẫu nhiên sẽ thích môn bóng rổ = Số học sinh thích môn bóng rổ / Tổng số học sinh. <br><br>
            Tổng số học sinh là 20 + 10 + 5 = 35. <br><br>
            Xác suất = 10 / 35 = 0.2. <br><br>
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


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
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = -2
        `,
        answers: [
            "(-<sup>12</sup>/<sub>5</sub>; -<sup>9</sup>/<sub>5</sub>)",
            "Vô nghiệm",
            "(3; 2)",
            "(-1; 5)",
        ],
        explain: `
            Với m = -2 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-8x + 9y = 3</p><br>
            Nhân hai vế của phương trình thứ nhất với 4, ta được:<br>
            <p class="highlight red indent">8x - 4y = -12</p>
            <p class="highlight red indent">-8x + 9y = 3</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 5y = -9 hay 
            y = -<sup>9</sup>/<sub>5</sub><br><br>
            Thế y = -<sup>9</sup>/<sub>5</sub> vào phương trình thứ nhất của hệ
            đã cho, ta có 2x + <sup>9</sup>/<sub>5</sub> = -3 hay
            2x = -<sup>24</sup>/<sub>5</sub>, suy ra
            x = -<sup>12</sup>/<sub>5</sub><br><br>
            Vậy hệ phương trình đã cho có nghiệm là
            (-<sup>12</sup>/<sub>5</sub>; -<sup>9</sup>/<sub>5</sub>)
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = -3
        `,
        answers: [
            "Vô nghiệm",
            "(-3; -2)",
            "(5; 5)",
            "(-1; 6)",
        ],
        explain: `
            Với m = -3 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-18x + 9y = 0</p><br>
            Chia hai vế của phương trình thứ hai cho 9, ta được:<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2x + y = 0</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 
            0x + 0y = -3 (1)<br><br>
            Do không có giá trị nào của x và y thỏa mãn hệ thức (1) nên hệ phương 
            trình đã cho vô nghiệm.
        `
    }, {
        question: `
            Giải hệ phương trình<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2m²x + 9y = 3(m + 3)</p>
            trong trường hợp m = 3
        `,
        answers: [
            "Vô nghiệm",
            "(-3; -2)",
            "(5; 5)",
            "(-1; 6)",
        ],
        explain: `
            Với m = 3 ta có hệ phương trình
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-18x + 9y = 18</p><br>
            Chia hai vế của phương trình thứ hai cho 9, ta được:<br>
            <p class="highlight red indent">2x - y = -3</p>
            <p class="highlight red indent">-2x + y = 2</p><br>
            Cộng từng vế hai phương trình của hệ mới, ta được 
            0x + 0y = -1 (1)<br><br>
            Do không có giá trị nào của x và y thỏa mãn hệ thức (1) nên hệ phương 
            trình đã cho vô nghiệm.
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
    detailHTML += `<p><strong>Điểm của bạn: ${point} / ${maxPoint}</strong></p>`;

    detailHTML += `<h3>Tần suất sai từng câu:</h3><ul>`;
    questions.forEach((q, i) => {
      detailHTML += `<li>Câu ${i + 1}: sai ${wrongCount[i]} lần</li>`;
    });
    detailHTML += `</ul>`;

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

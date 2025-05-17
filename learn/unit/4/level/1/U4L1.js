
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
            Giải phương trình (x + 1)(3x - 1) = 0
        `,
        answers: [
            "(-1; <sup>1</sup>/<sub>3</sub>)",
            "(1; -2)",
            "(-<sup>3</sup>/<sub>4</sub>; <sup>1</sup>/<sub>7</sub>)",
            "(3; 2)",
        ],
        explain: `
            Ta giải hai phương trình sau:<br><br>
            ⦁ x + 1 = 0 suy ra x = -1.<br><br>
            ⦁ 3x - 1 = 0 hay 3x = 1, suy ra x = 
            <sup>1</sup>/<sub>3</sub><br><br>
            Vậy phương trình đã cho có hai nghiệm là x = -1 và 
            x = <sup>1</sup>/<sub>3</sub>
        `
    }, {
        question: `
            Giải phương trình (3x + 1)(2 - 4x) = 0
        `,
        answers: [
            "(-<sup>1</sup>/<sub>3</sub>; <sup>1</sup>/<sub>2</sub>)",
            "(0; -4)",
            "(-<sup>5</sup>/<sub>2</sub>; <sup>3</sup>/<sub>2</sub>)",
            "(-5; -2)",
        ],
        explain: `
            Ta giải hai phương trình sau:<br><br>
            ⦁ 3x + 1 = 0 hay 3x = -1, suy ra 
            x = -<sup>1</sup>/<sub>3</sub>.<br><br>
            ⦁ 2 - 4x = 0 hay -4x = -2, suy ra 
            x = <sup>1</sup>/<sub>2</sub><br><br>
            Vậy phương trình đã cho có hai nghiệm là 
            x = -<sup>1</sup>/<sub>3</sub> và 
            x = <sup>1</sup>/<sub>2</sub>
        `
    }, {
        question: `
            Trong một khu vườn hình vuông có cạnh bằng 15 m người ta làm một 
            lối đi xung quanh vườn có bề rộng là x (m) (H.2.1). Để diện tích 
            phần đất còn lại là 169 m2 thì bề rộng x của lối đi là bao nhiêu?<br>
            <div class="container-img">
                <img class="center-content" src="images/img1.png">
            </div>
            
        `,
        answers: [
            "1m",
            "2m",
            "3m",
            "1,5m",
        ],
        explain: `
            Phần đất còn lại có dạng hình vuông có độ dài cạnh là: 
            15 - x - x = 15 - 2x (m). Do độ dài cạnh của phần đất còn 
            lại lớn hơn 0 nên 15 - 2x > 0.<br><br>
            Diện tích phần đất còn lại là: (15 - 2x)²(m²).<br><br>
            Theo bài, diện tích phần đất còn lại là 169m² nên ta có phương 
            trình:<br><br>
            (15 - 2x)² = 169.<br><br>
            Giải phương trình: <br>
            (15 - 2x)² = 169<br>
            (15 - 2x)² - 132 = 0<br>
            (15 - 2x - 13)(15 - 2x + 13) = 0<br>
            (2 - 2x)(28 - 2x) = 0<br><br>
            Ta giải hai phương trình sau:<br><br>
            ⦁ 2 - 2x = 0 hay -2x = -2, suy ra x = 1.<br><br>
            ⦁ 28 - 2x = 0 hay -2x = -28, suy ra x = 14.<br><br>
            Với x = 1 thì độ dài cạnh của phần đất còn lại là 15 - 2.1 = 13 (m).<br>
            Với x = 14 thì độ dài cạnh của phần đất còn lại là 
            15 - 2.14 = -13 < 0 (vô lí).<br>
            Vậy để diện tích phần đất còn lại là 169m² thì bề rộng 
            của lối đi là 1m.
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

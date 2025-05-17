
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
            Một bể chứa nước có dạng hình trụ với chiều cao 4 m và bán kính đáy là 2 m.  
            Tính diện tích xung quanh của bể chứa nước. <br><br>
        `,
        answers: [
            `Diện tích xung quanh = 50,24 m²`,
            `Diện tích xung quanh = 100,48 m²`,
            `Diện tích xung quanh = 25,12 m²`,
            `Diện tích xung quanh = 75,36 m²`,
        ],
        explain: `
            - Diện tích xung quanh của hình trụ được tính theo công thức: S = 2πrh. <br>
            - Thay r = 2 m và h = 4 m vào công thức, ta có: S = 2π × 2 × 4 = 50,24 m². Phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Một đống cát được đổ vào một thùng hình nón với chiều cao 3 m và bán kính đáy 1,5 m.  
            Tính thể tích của đống cát. <br><br>
        `,
        answers: [
            `Thể tích = 21,2 m³`,
            `Thể tích = 31,4 m³`,
            `Thể tích = 14,5 m³`,
            `Thể tích = 23,5 m³`,
        ],
        explain: `
            - Thể tích của hình nón được tính theo công thức: V = (1/3)πr²h. <br>
            - Thay r = 1,5 m và h = 3 m vào công thức, ta có: V = (1/3)π(1,5)²(3) ≈ 21,2 m³. Phương án A là đúng. <br><br>
        `,
    },
    {
        question: `
            Một ống nước có dạng hình trụ rỗng với chiều cao 2 m và đường kính ngoài là 8 cm, đường kính trong là 6 cm.  
            Tính thể tích của phần ống nước chứa nước. <br><br>
        `,
        answers: [
            `Thể tích = 37,7 cm³`,
            `Thể tích = 50,3 cm³`,
            `Thể tích = 120,8 cm³`,
            `Thể tích = 25,4 cm³`,
        ],
        explain: `
            - Thể tích của phần ống nước chứa nước được tính theo công thức: V = πh(R² - r²), trong đó R là bán kính ngoài và r là bán kính trong. <br>
            - Thay h = 200 cm, R = 4 cm và r = 3 cm vào công thức, ta có: V = π × 200 × (4² - 3²) = π × 200 × (16 - 9) = π × 200 × 7 ≈ 4398 cm³ ≈ 37,7 cm³. Phương án A là đúng. <br><br>
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

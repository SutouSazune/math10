
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
            Trong tam giác vuông MNP, vuông tại N, biết MN = 8 cm và NP = 15 cm. Hãy tính số đo 3 góc trong tam giác.
        `,
        answers: [
            `Góc M = 28.07°, góc P = 61.93°, góc N = 90°`,
            `Góc M = 30°, góc P = 60°, góc N = 90°`,
            `Góc M = 25°, góc P = 65°, góc N = 90°`,
            `Góc M = 40°, góc P = 50°, góc N = 90°`,
        ],
        explain: `
            - Tính cạnh huyền MP bằng định lý Pythagoras: MP = √(MN² + NP²) = √(8² + 15²) = √(64 + 225) = √289 = 17 cm. <br>
            - Tính góc M bằng công thức: tan(M) = đối/kề = NP/MN = 15/8. <br>
              Góc M = tan⁻¹(15/8) ≈ 61.93°. <br>
            - Góc P = 90° - góc M = 90° - 61.93° ≈ 28.07°. <br>
            - Góc N = 90° (góc vuông).
        `
    },
    {
        question: `
            Trong tam giác vuông ABC, vuông tại A, biết góc B = 45° và cạnh AB = 7√2 cm. Hãy tính độ dài các cạnh còn lại.
        `,
        answers: [
            `AC = 7 cm, BC = 14 cm`,
            `AC = 10 cm, BC = 20 cm`,
            `AC = 7√3 cm, BC = 10 cm`,
            `AC = 8 cm, BC = 16 cm`,
        ],
        explain: `
            - Vì góc B = 45°, tam giác vuông ABC là tam giác vuông cân. <br>
            - Do đó, AB = AC, và cạnh huyền BC = AB√2. <br>
            - AC = AB = 7 cm. <br>
            - BC = AB√2 = 7√2 × √2 = 14 cm.
        `
    },
    {
        question: `
            Một mảnh đất hình chữ nhật có chiều dài 24 m và chiều rộng 18 m. Hỏi độ dài đường chéo của mảnh đất.
        `,
        answers: [
            `30 m`,
            `28 m`,
            `26 m`,
            `25 m`,
        ],
        explain: `
            - Đường chéo chia mảnh đất thành hai tam giác vuông. <br>
            - Áp dụng định lý Pythagoras: đường chéo = √(dài² + rộng²). <br>
            - Đường chéo = √(24² + 18²) = √(576 + 324) = √900 = 30 m.
        `
    },
    {
        question: `
            Một chiếc thang dài 10 m được đặt nghiêng vào tường. Đầu thang cách mặt đất 6 m. Hỏi chân thang cách chân tường bao xa?
        `,
        answers: [
            `8 m`,
            `6 m`,
            `7 m`,
            `9 m`,
        ],
        explain: `
            - Xem chiếc thang, tường và mặt đất như một tam giác vuông. <br>
            - Sử dụng định lý Pythagoras: cạnh góc vuông còn lại = √(huyền² - góc vuông²). <br>
            - Khoảng cách = √(10² - 6²) = √(100 - 36) = √64 = 8 m.
        `
    }, {
        question: `
            Trong tam giác DEF vuông tại D, biết DE = 12 cm và DF = 5 cm. Hãy tính cạnh huyền EF.
        `,
        answers: [
            `13 cm`,
            `14 cm`,
            `15 cm`,
            `10 cm`,
        ],
        explain: `
            - Áp dụng định lý Pythagoras: EF² = DE² + DF². <br>
            - EF = √(DE² + DF²) = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.
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
        <div class="rank-large rank-${rankclass}" title="Xếp hạng của bạn">${rank}</div>
      </div>`;

    detailHTML += `<p>Bạn đã làm sai tổng cộng <strong>${totalWrong}</strong> lần.</p>`;

    detailHTML += `
      <details>
        <summary><strong>Chi tiết số lần sai từng câu</strong></summary>
        <ul>`;
    questions.forEach((q, i) => {
      detailHTML += `<li>Câu ${i + 1}: sai ${wrongCount[i]} lần</li>`;
    });
    detailHTML += `</ul></details>`;

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


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
};;


const loadMathJax = () => {
  if (window.MathJax) return Promise.resolve();
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = false;
    script.onload = () => {
      console.log("MathJax loaded");
      resolve();
    };
    document.head.appendChild(script);
  });
};

import { updateProgressBar } from "../../../../utils/util.js";

const questions = [
  {
    question:
      "Phương trình bậc nhất hai ẩn x và y là hệ thức dạng \\(ax + by = c\\)",
    answers: [
      "\\(ax + by = c\\)",
      "ax² + by = c",
      "0x + 0y = c",
      "\\( ax + b \\sqrt{y} = c \\)",
    ],
    explain: `
            Phương trình bậc nhất hai ẩn x và y là hệ thức dạng<br>
            <p class="center-text highlight red">\\(ax + by = c\\)</p>
        `,
  },
  {
    question:
      "Hệ thức nào <span class='highlight red'>không</span> là phương trình bậc nhất hai ẩn",
    answers: ["0x + 0y = 5", "3x + 2y = 6", "7y = 2", "0x + y = -1"],
    explain: `
            Phương trình bậc nhất hai ẩn x và y là hệ thức dạng<br>
            <p class="center-text">\\(ax + by = c\\)</p>
            <p>Trong đó a và b <span class="highlight red">không đồng thời bằng 0</span></p>
        `,
  },
  {
    question: "Cặp số nào sau đây là nghiệm của phương trình \\(x + 3y = -5\\)",
    answers: ["(4; -3)", "(-2; 2)", "(3; 1)", "(-6; 2)"],
    explain: `
            Thay x = 4, y = -3 vào phương trình ta được<br>
            \\(4 + 3(-3) = -5\\)<br>
            -5 = -5 (Đúng)
        `,
  },
  {
    question: "Cặp số nào sau đây là nghiệm của phương trình \\(2x - y = 7\\)",
    answers: ["(5; 3)", "(3; 1)", "(2; -3)", "(6; -5)"],
    explain: `
            Thay từng cặp số vào phương trình \\(2x - y = 7\\)<br>
            Với (5; 3): \\(2(5) - 3 = 10 - 3 = 7\\) (Đúng)<br>
            Các cặp còn lại không thỏa mãn.
        `,
  },
  {
    question:
      "Điều kiện để hệ số của phương trình \\(ax + by = c\\) không phải là phương trình bậc nhất hai ẩn là",
    answers: ["a = 0 và b = 0", "a = 0 hoặc b = 0", "a = 1 và b = -1", "c = 0"],
    explain: `
            Phương trình bậc nhất hai ẩn có dạng \\(ax + by = c\\)<br>
            Trong đó, a và b <span class="highlight red">không đồng thời bằng 0</span>.
        `,
  },
  {
    question: "Phương trình nào sau đây là phương trình bậc nhất hai ẩn",
    answers: ["2x - 3y = 5", "x² + y = 4", "y² = 7", "√x + y = 1"],
    explain: `
            Phương trình bậc nhất hai ẩn có dạng \\(ax + by = c\\)<br>
            Phương trình 2x - 3y = 5 là đúng dạng.
        `,
  },
  {
    question:
      "Tìm giá trị của m để cặp số \\((1; -2)\\) là nghiệm của phương trình \\(mx - y = 5\\)",
    answers: ["3", "5", "7", "0"],
    explain: `
            Thay x = 1, y = -2 vào phương trình \\(mx - y = 5\\)<br>
            \\(m(1) - (-2) = 5\\)<br>
            \\(m + 2 = 5 ⟹ m = 3.\\)
        `,
  },
  {
    question: "Phương trình nào có nghiệm \\((2; 3)\\)",
    answers: ["x + 2y = 8", "x - y = 5", "3x + y = 10", "2x - 3y = 6"],
    explain: `
            Thay x = 2, y = 3 vào từng phương trình:<br>
            Với \\(x + 2y = 8\\): \\(2 + 2(3) = 8\\) (Đúng).<br>
            Các phương trình còn lại không thỏa mãn.
        `,
  },
  {
    question: "Cặp nghiệm nào đúng với phương trình \\(3x + 4y = 12\\)",
    answers: ["(4; 0)", "(2; 3)", "(0; 3)", "(1; 2)"],
    explain: `
            Thay từng cặp nghiệm vào phương trình \\(3x + 4y = 12\\):<br>
            Với (4; 0): \\(3(4) + 4(0) = 12\\) (Đúng).<br>
            Các cặp còn lại không thỏa mãn.
        `,
  },
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function getUnitAndLevel() {
  const pathParts = window.location.pathname.split("/");
  const unitIndex = pathParts.indexOf("unit");
  const levelIndex = pathParts.indexOf("level");

  if (unitIndex !== -1 && levelIndex !== -1) {
    const unit = parseInt(pathParts[unitIndex + 1], 10);
    const level = parseInt(pathParts[levelIndex + 1], 10);
    return { unit, level };
  }

  return { unit: null, level: null };
}

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
  "/lesson/unit1/level5",
];

function displayQuestion() {
  if (lesson.length === 0) {
    document.getElementById("result-overlay").style.display = "flex";
    let units = JSON.parse(localStorage.getItem("units"));
    const { unit, level } = getUnitAndLevel();
    units[0].levels[1].state = "unlock";
    localStorage.setItem("units", JSON.stringify(units));

    const totalWrong = wrongCount.reduce((sum, val) => sum + val, 0);
    let rank = "S";
    let rankclass = "S";
    if (totalWrong >= 1) rank = "A+";
    if (totalWrong >= 2) rank = "A";
    if (totalWrong >= 4) rank = "B+";
    if (totalWrong >= 6) rank = "B";
    if (totalWrong >= 8) rank = "C+";
    if (totalWrong >= 10) rank = "C";
    if (totalWrong >= 12) rank = "F";
    if (rank === "S") rankclass = "S";
    if (rank === "A+") rankclass = "Aplus";
    if (rank === "A") rankclass = "A";
    if (rank === "B+") rankclass = "Bplus";
    if (rank === "B") rankclass = "B";
    if (rank === "C+") rankclass = "Cplus";
    if (rank === "C") rankclass = "C";
    if (rank === "F") rankclass = "F";

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



    wrongCount.forEach((count, i) => {
      if (count > 0) {
        detailHTML += `<li><a href="${
          questionLinks[i]
        }" target="_blank">Ôn bài cho câu ${i + 1}</a> (sai ${count} lần)</li>`;
      }
    });
    detailHTML += `</ul>`;

    const container = document.getElementById("result-detail");
    if (container) {
      container.innerHTML = detailHTML;
      container.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Bạn đã hoàn thành tất cả câu hỏi!");
      document.location.href = `../../../../?unit${unit}-level${level}=complete`;
    }

    return;
  }

  const { question, answers, explain } = lesson[0];
  const correctAnswer = answers[0];
  const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

  const questionElement = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options-container");
  const explainElement = document.querySelector(".explain");
  const checkButton = document.querySelector(".check-btn");
  const continueButton = document.querySelector(".continue-btn");

  questionElement.innerHTML = question;
  optionsContainer.innerHTML = "";
  explainElement.innerHTML = "";
  continueButton.classList.add("hide");

  let selectedOption = null;

  shuffledAnswers.forEach((answer) => {
    const option = document.createElement("div");
    option.className = "option";
    option.innerHTML = answer;
    option.dataset.answer = answer;
    option.addEventListener("click", () => {
      if (selectedOption) {
        selectedOption.classList.remove("selected");
      }
      option.classList.add("selected");
      selectedOption = option;
    });
    optionsContainer.appendChild(option);
  });

  loadMathJax().then(() =>
    MathJax.typesetPromise([questionElement, optionsContainer])
  );

  checkButton.replaceWith(checkButton.cloneNode(true));
  const newCheckButton = document.querySelector(".check-btn");

  newCheckButton.style.pointerEvents = "auto";
  newCheckButton.addEventListener("click", () => {
    if (!selectedOption) {
      alert("Vui lòng chọn một đáp án!");
      return;
    }

    const isCorrect = selectedOption.dataset.answer === correctAnswer;
    selectedOption.classList.add(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      point++;
      lesson.shift();
      updateProgressBar(point, maxPoint);
      explainElement.innerHTML = explain;
    } else {
      const currentQuestionIndex = questions.findIndex(
        (q) => q.question === lesson[0].question
      );
      if (currentQuestionIndex !== -1) {
        wrongCount[currentQuestionIndex]++;
      }
      const currentQuestion = lesson.shift();
      lesson.push(currentQuestion);
      explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
    }

    const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
    audio.play();

    optionsContainer.querySelectorAll(".option").forEach((option) => {
      option.style.pointerEvents = "none";
    });
    newCheckButton.style.pointerEvents = "none";
    continueButton.classList.remove("hide");

    loadMathJax().then(() => MathJax.typesetPromise([explainElement]));
  });
}

function setContinueButton() {
  const continueButton = document.querySelector(".continue-btn");
  continueButton.addEventListener("click", displayQuestion);
}

// Khởi tạo quiz
setContinueButton();
displayQuestion();

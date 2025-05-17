import { updateProgressBar } from "../utils/util.js";

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
};

// Hàm load MathJax khi có công thức toán
const loadMathJax = () => {
  if (window.MathJax) return Promise.resolve();
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = false;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

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

// Hàm xử lý bài học, nhận vào danh sách câu hỏi và thông tin unit/level
export function runLesson(questions, unit, level, questionLinks) {
  const maxPoint = questions.length;
  let point = 0;
  let lesson = [...questions];
  const wrongCount = new Array(questions.length).fill(0);

  function displayQuestion() {
    if (lesson.length === 0) {
      document.getElementById("result-overlay").style.display = "flex";
      let units = JSON.parse(localStorage.getItem("units"));
      if (units && units[unit - 1]?.levels[level]) {
        units[unit - 1].levels[level].state = "unlock";
        localStorage.setItem("units", JSON.stringify(units));
      }

      const totalWrong = wrongCount.reduce((sum, val) => sum + val, 0);
      const getRank = (wrong) =>
        wrong >= 12 ? "F" :
        wrong >= 10 ? "C" :
        wrong >= 8 ? "C+" :
        wrong >= 6 ? "B" :
        wrong >= 4 ? "B+" :
        wrong >= 2 ? "A" :
        wrong >= 1 ? "A+" : "S";

      const rank = getRank(totalWrong);
      const rankclass = rank.replace("+", "plus");

      let html = `<h2>Kết quả bài học</h2>`;
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <p style="margin: 0;"><strong>Điểm của bạn: ${point} / ${maxPoint}</strong></p>
          <div class="rank-large rank-${rankclass}">${rank}</div>
        </div>
        <p>Bạn đã làm sai tổng cộng <strong>${totalWrong}</strong> lần.</p>
        <details><summary><strong>Chi tiết số lần sai từng câu</strong></summary><ul>`;
      questions.forEach((_, i) => {
        html += `<li>Câu ${i + 1}: sai ${wrongCount[i]} lần</li>`;
      });
      html += `</ul></details><h3>Bài học cần ôn tập:</h3><ul>`;
      wrongCount.forEach((count, i) => {
        if (count > 0) {
          html += `<li><a href="${questionLinks[i]}" target="_blank">Ôn bài câu ${i + 1}</a> (sai ${count} lần)</li>`;
        }
      });
      html += `
<div class="back-button-container">
    <button onclick="handleBackButtonClick()">← Quay về</button>
</div>`;

      document.getElementById("result-detail").innerHTML = html;
      return;
    }

    const { question, answers, explain } = lesson[0];
    const correctAnswer = answers[0];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    document.querySelector(".question").innerHTML = question;
    const optionsContainer = document.querySelector(".options-container");
    const explainElement = document.querySelector(".explain");
    optionsContainer.innerHTML = "";
    explainElement.innerHTML = "";
    document.querySelector(".continue-btn").classList.add("hide");

    let selectedOption = null;
    shuffledAnswers.forEach((answer) => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerHTML = answer;
      div.dataset.answer = answer;
      div.addEventListener("click", () => {
        if (selectedOption) selectedOption.classList.remove("selected");
        div.classList.add("selected");
        selectedOption = div;
      });
      optionsContainer.appendChild(div);
    });

    loadMathJax().then(() => MathJax.typesetPromise());

    const checkBtn = document.querySelector(".check-btn");
    checkBtn.replaceWith(checkBtn.cloneNode(true));
    const newCheckBtn = document.querySelector(".check-btn");

    newCheckBtn.addEventListener("click", () => {
      if (!selectedOption) return alert("Vui lòng chọn một đáp án!");
      const isCorrect = selectedOption.dataset.answer === correctAnswer;
      selectedOption.classList.add(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        point++;
        lesson.shift();
        updateProgressBar(point, maxPoint);
        explainElement.innerHTML = explain;
      } else {
        const idx = questions.findIndex((q) => q.question === lesson[0].question);
        wrongCount[idx]++;
        lesson.push(lesson.shift());
        explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
      }

      const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
      audio.play();
      optionsContainer.querySelectorAll(".option").forEach(opt => opt.style.pointerEvents = "none");
      newCheckBtn.style.pointerEvents = "none";
      document.querySelector(".continue-btn").classList.remove("hide");

      loadMathJax().then(() => MathJax.typesetPromise());
    });
  }

  document.querySelector(".continue-btn").addEventListener("click", displayQuestion);
  displayQuestion();
}

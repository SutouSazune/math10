
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
            Tìm số nhiên n có hai số, biết rằng tổng của hai chữ số bằng 12, 
            và nếu viết hai chữ số theo thứ tự ngược lại thì được một số lớn 
            hơn n là 36 đơn vị.
        `,
        answers: [
            "48",
            "64",
            "36",
            "20",
        ],
        explain: `
            Gọi số cần tìm là <span class="overline-text">
            ab</span> (a, b ∈ N*; 0 < a < b < 10)<br><br>
            Tổng của hai chữ số bằng 12 nên ta có a + b = 12. (1)<br><br>
            Số ban đầu là <span class="overline-text">ab</span> = 10a + b<br><br>
            Khi đổi chỗ hai chữ số thì ta được số mới là
            <span class="overline-text">ba</span> = 10b + a<br><br>
            Số mới lớn hơn số cũ 36 đơn vị nên ta có phương trình<br><br>
            10a + b + 36 = 10b + a hay 9b - 9a = 36, suy ra b - a = 4 (2)<br><br>
            Từ (1) và (2), ta có hệ phương trình<br>
            <p class="highlight red indent">a + b = 12</p>
            <p class="highlight red indent">b - a = 4</p><br>
            Trừ từng vế hai phương trình của hệ mới, ta được 2a = 8 hay 
            a = 4 (thỏa mãn điều kiện).<br><br>
            Thay a = 4 vào phương trình thứ nhất của hệ, ta có<br><br>
            4 + b = 12, suy ra b = 12 – 4 = 8 (thỏa mãn điều kiện).<br><br>
            Vậy số cần tìm là 48.<br><br>
        `
    }, {
        question: `
            Một chiếc xe khách đi từ Thành phố Hồ Chí Minh đến Cần Thơ, 
            quãng đường dài 170 km. Sau khi xe khách xuất phát 1 giờ 40 phút, 
            một chiếc xe tải bắt đầu đi từ Cần Thơ về Thành phố Hồ Chí Minh 
            (trên cùng một tuyến đường với xe khách) và gặp xe khách sau đó 
            40 phút. Tính vận tốc mỗi xe, biết rằng mỗi giờ xe khách đi nhanh 
            hơn xe tải 15 km.
        `,
        answers: [
            `<p>xe khách: 60km/h</p>
             <p>xe tải: 45km/h</p>`,
             `<p>xe khách: 45km/h</p>
             <p>xe tải: 60km/h</p>`,
             `<p>xe khách: 40km/h</p>
             <p>xe tải: 55km/h</p>`,
             `<p>xe khách: 35km/h</p>
             <p>xe tải: 50km/h</p>`,
        ],
        explain: `
            Gọi x(km/h), y(km/h) lần lượt là vận tốc của xe khách và xe tải 
            (x > 0, y > 0).<br><br>
            Vì mỗi giờ xe khách đi nhanh hơn xe tải 15 km nên ta có 
            x - y = 15. (1)<br><br>
            Vì quãng đường Thành phố Hồ Chí Minh đến Cần Thơ dài 170 km nên ta có
            <sup>7</sup>/<sub>3</sub>x + <sup>2</sup>/<sub>3</sub>y = 170 (2)<br><br>
            Từ (1) và (2) ta có hệ phương trình <br><br>
            <p class="highlight red indent">x - y = 15</p>
            <p class="highlight red indent">7x + 2y = 510</p><br>
            Từ phương trình thứ nhất của hệ trên, ta có y = x - 15. Thế vào 
            phương trình thứ hai của hệ trên, ta được<br><br>
            7x + 2.(x - 15) = 510, tức là 9x - 30 = 510, suy ra x = 60 
            (thỏa mãn điều kiện).<br><br>
            Từ đó y = 60 - 15 = 45 (thỏa mãn điều kiện).<br><br>
            Vậy vận tốc của xe khách là 60 km/h và vận tốc của xe tải là 45 km/h.
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

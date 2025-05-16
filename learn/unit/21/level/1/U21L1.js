
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
            Một mảnh đất hình chữ nhật có diện tích 360 m². Nếu tăng chiều rộng 3 m và giảm chiều dài 4 m thì diện tích mảnh đất không đổi. Tìm các kích thước của mảnh đất đó.
        `,
        answers: [
            `Chiều dài = 24 m, chiều rộng = 15 m`,
            `Chiều dài = 20 m, chiều rộng = 18 m`,
            `Chiều dài = 30 m, chiều rộng = 12 m`,
            `Chiều dài = 25 m, chiều rộng = 14 m`,
        ],
        explain: `
            Gọi chiều dài của mảnh đất là x m và chiều rộng là y m. <br><br>
            Diện tích của mảnh đất là xy = 360. <br><br>
            Sau khi thay đổi, diện tích vẫn không đổi, ta có phương trình: (x - 4)(y + 3) = 360. <br><br>
            
            Mở rộng phương trình: <br><br>
            (x - 4)(y + 3) = xy + 3x - 4y - 12 = 360. <br><br>
            Thay xy = 360 vào phương trình, ta có: <br><br>
            360 + 3x - 4y - 12 = 360 <br><br>
            => 3x - 4y = 12. <br><br>
    
            Giờ ta có hệ phương trình: <br><br>
            1. x * y = 360 <br><br>
            2. 3x - 4y = 12 <br><br>
            
            Biến đổi phương trình thứ hai: <br><br>
            y = (3x - 12) / 4. <br><br>
            Thay vào phương trình đầu tiên: <br><br>
            x * (3x - 12) / 4 = 360 <br><br>
            => 3x² - 12x = 1440 <br><br>
            => x² - 4x = 480 <br><br>
            => x² - 4x - 480 = 0. <br><br>
    
            Giải phương trình bậc hai: <br><br>
            x = (4 ± √(4² - 4 * 1 * (-480))) / 2 <br><br>
            = (4 ± √(16 + 1920)) / 2 <br><br>
            = (4 ± √1936) / 2 <br><br>
            = (4 ± 44) / 2. <br><br>
    
            Ta có hai nghiệm: <br><br>
            x = (4 + 44) / 2 = 24 m <br><br>
            hoặc <br><br>
            x = (4 - 44) / 2 = -20 m (loại vì chiều dài không thể âm). <br><br>
    
            Với x = 24 m, thay vào phương trình x * y = 360, ta có y = 15 m. <br><br>
    
            Vậy kích thước của mảnh đất là: chiều dài = 24 m và chiều rộng = 15 m. <br><br>
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
    detailHTML += `</ul>`;

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

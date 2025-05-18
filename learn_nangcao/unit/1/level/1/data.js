export const questions = [
  {
    question: "Để chứng minh \\(A \\ge B\\), ta cần chứng minh?",
    answers: ["\\(A - B \\ge 0\\)", "\\(A - B > 0\\)", "\\(A - B < 0\\)", "\\(A - B \\le 0\\)"],
    explain: `Lý thuyết cơ bản về chứng minh đẳng thức bằng phương pháp sử dụng định nghĩa.
      <br><strong>Để chứng minh \\(A \\ge B\\), ta cần chứng minh \\(A - B \\ge 0\\)</strong>
    `,
  },
  {
    question: "Xét \\(2(a^2+b^2)-(a+b)^2\\), ta có:",
    answers: ["\\((a-b)^2 \\ge 0\\)", "\\(a^2+2ab-b^2 \\ge 0\\)", "\\((a-b)^2 \\le 0\\)", "\\((a-b)^2 \\le 0\\)"],
    explain: `Xét \\(2(a^2+b^2)-(a+b)^2\\)
    <br>\\(= 2a^2 + 2b^2 - (a^2 + 2ab + b^2)\\)
    <br>\\(= a^2 - 2ab + b^2\\)
    <br>\\(= (a-b)^2 \\ge 0\\) luôn đúng \\(\\forall a,b \\in \\mathbb{R}\\)
    `,
  },
];

export const questionLinks = [
  "/lesson/unit1/level1",
  "/lesson/unit1/level1",
  "/lesson/unit1/level2",
  "/lesson/unit1/level2",
];

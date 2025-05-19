export const questions = [
  {
    question: "Rút gọn biểu thức: \\((\\frac{3\\sqrt{x}}{\\sqrt{x}+2}+\\frac{\\sqrt{x}}{2-\\sqrt{x}}+\\frac{8\\sqrt{x}}{x-4})\\div(2-\\frac{2\\sqrt{x}+3}{\\sqrt{x}+2})\\)",
    answers: ["\\(\\frac{2x}{\\sqrt{x}-2}\\)", "\\(\\frac{3x}{\\sqrt{x}-2}\\)", "\\(\\frac{4x}{\\sqrt{x}-2}\\)", "\\(\\frac{5x}{\\sqrt{x}-2}\\)"],
    explain: `Để tính rút gọn biểu thức, ta cần tính các giá trị của các biểu thức được tích hợp.
    <br>Điều kiện xác định: \\(x\\ge 0; x\\ne 4\\)
    <br>\\((\\frac{3\\sqrt{x}}{\\sqrt{x}+2}+\\frac{\\sqrt{x}}{2-\\sqrt{x}}+\\frac{8\\sqrt{x}}{x-4})\\div(2-\\frac{2\\sqrt{x}+3}{\\sqrt{x}+2})\\)
    <br>\\(=\\frac{3\\sqrt{x}(\\sqrt{x}-2)}{(\\sqrt{x}+2)(\\sqrt{x}-2)}-\\frac{\\sqrt{x}(\\sqrt{x}+2)}{(\\sqrt{x}+2)(\\sqrt{x}-2)}+\\frac{8\\sqrt{x}}{(\\sqrt{x}+2)(\\sqrt{x}-2)})\\div(\\frac{2(\\sqrt{x}+2}{\\sqrt{x}+2}-\\frac{2\\sqrt{x}+3}{\\sqrt{x}+2})\\)
    <br>\\(=\\frac{3x+6\\sqrt{x}-x-2\\sqrt{x}+8\\sqrt{x}}{(\\sqrt{x}+2)(\\sqrt{x}-2)}\\div\\frac{2\\sqrt{x}+4-2\\sqrt{x}-3}{\\sqrt{x}+2}\\)
    <br>\\(=\\frac{2x}{(\\sqrt{x}+2)(\\sqrt{x}-2)}\\dot(\\sqrt{x}+2)\\)
    <br>\\(=\\frac{2x}{\\sqrt{x}-2}\\)(thoả)
    `,
  },
  {
    question: "",
    answers: [""],
    explain: `
    `,
  },
  {
    question: "",
    answers: [""],
    explain: `
    `,
  },
];

export const questionLinks = [
  "/lesson/unit1/level1",
  "/lesson/unit1/level1",
  "/lesson/unit1/level2",
  "/lesson/unit1/level2",
];

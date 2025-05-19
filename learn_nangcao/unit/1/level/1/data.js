export const questions = [
  {
    question: "Giá trị của biểu thức: \\(\\sqrt{32}+\\sqrt{50}-3\\sqrt{8}-\\sqrt{18}\\)",
    answers: ["0", "1", "2", "3"],
    explain: `Để tính giá trị của biểu thức, ta cần tính các giá trị của các biểu thức được tích hợp.
    <br>\\(=\\sqrt{32}+\\sqrt{50}-3\\sqrt{8}-\\sqrt{18}\\)
    <br>\\(=\\sqrt{16\\cdot2}+\\sqrt{25\\cdot2}-3\\sqrt{8\\cdot2}-\\sqrt{9\\cdot2}\\)
    <br>\\(=4\\sqrt{2}+5\\sqrt{2}-3\\sqrt{2}-3\\sqrt{2}\\)
    <br>\\(=(4+5-6-3)\\cdot\\sqrt{2}\\)
    <br>\\(=0\\cdot\\sqrt{2}\\)
    <br>\\(=0\\)
    `,
  },
  {
    question: "Rút gọn biểu thức: \\(\\sqrt{4-2\\sqrt{3}}-\\sqrt{3}\\)",
    answers: ["-1", "0", "1", "2"],
    explain: `Để tính rút gọn biểu thức, ta cần tính các giá trị của các biểu thức được tích hợp.
    <br>\\(=\\sqrt{(\\sqrt{3}-1)^2}-\\sqrt{3}\\)
    <br>\\(=\\sqrt{3}-1-\\sqrt{3}\\)
    <br>\\(=-1\\)
    `,
  },
  {
    question: "Rút gọn biểu thức: \\(\\frac{4}{3-\\sqrt{5}}+\\frac{4}{3+\\sqrt{5}}\\)",
    answers: ["6", "7", "8", "9"],
    explain: `Để tính rút gọn biểu thức, ta cần tính các giá trị của các biểu thức được tích hợp.
    <br>\\(=\\frac{4(3+\\sqrt{5})}{(3-\\sqrt{5})(3+\\sqrt{5})}+\\frac{4(3-\\sqrt{5})}{(3-\\sqrt{5})(3+\\sqrt{5})}\\)  
    <br>\\(=\\frac{4(3+\\sqrt{5})}{9-5}+\\frac{4(3-\\sqrt{5})}{9-5}\\)
    <br>\\(=3+\\sqrt{5}+3-\\sqrt{5}\\)
    <br>\\(=6\\)
    `,
  },
];

export const questionLinks = [
  "https://www.youtube.com/watch?v=xIP4FRn6k2w",
  "https://www.youtube.com/watch?v=tOG3qvIMpK0",
  "https://www.youtube.com/watch?v=px242b5fjII",
];

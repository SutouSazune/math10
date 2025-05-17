const fs = require('fs');
const path = require('path');

// CSS mới
const newStyleBlock = `
<style>
  #result-detail {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    max-width: 700px;
    width: 90%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    max-height: 80vh;
    overflow-y: auto;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    margin: 20px auto;
    position: relative;
  }

  #result-detail h2 {
    color: #2c3e50;
    font-size: 1.8em;
    margin-bottom: 12px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 6px;
  }

  #result-detail h3 {
    margin-top: 16px;
    color: #34495e;
    font-size: 1.2em;
    margin-bottom: 8px;
  }

  #result-detail p {
    font-size: 1.1em;
    margin-bottom: 12px;
  }

  #result-detail ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 16px;
  }

  #result-detail ul li {
    margin-bottom: 6px;
    font-size: 1em;
  }

  #result-detail ul li a {
    color: #2980b9;
    text-decoration: none;
    font-weight: 600;
  }

  #result-detail ul li a:hover {
    text-decoration: underline;
  }

  #result-detail .highlight.red {
    color: #e74c3c;
    font-weight: bold;
  }

  #result-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .rank-box {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 1.2em;
    color: white;
    margin-left: 8px;
  }

  .rank-large {
    width: 180px;
    height: 180px;
    font-size: 5.5em;
    font-weight: 800;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    margin-left: auto;
    margin-bottom: 20px;
  }

  .rank-S {
    color: #ffdd00 !important;
  }
  .rank-Aplus {
    color: #00ff2f !important;
  }
  .rank-A {
    color: #00b23e !important;
  }
  .rank-Bplus {
    color: #e9a804 !important;
  }
  .rank-B {
    color: #fe7a06 !important;
  }
  .rank-Cplus {
    color: #e74c3c !important;
  }
  .rank-C {
    color: #c0392b !important;
  }
  .rank-F {
    color: #ff0000 !important;
  }

  details summary {
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .back-button-container {
    position: absolute;
    bottom: 20px;
    right: 30px;
  }

  .back-button-container button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: background-color 0.3s ease;
  }

  .back-button-container button:hover {
    background-color: #2980b9;
  }
</style>
`;

// Nút quay về
const backButtonHTML = `
  <div class="back-button-container">
    <button onclick="window.location.href='../../../../index.html'">← Quay về</button>
  </div>
`;

// Duyệt đệ quy qua thư mục
function processLevelDir(levelPath, unitNum, levelNum) {
  const htmlPath = path.join(levelPath, 'index.html');
  const jsPath = path.join(levelPath, `U${unitNum}L${levelNum}.js`);

  // Chỉnh HTML
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    htmlContent = htmlContent.replace(/<style>[\s\S]*?<\/style>/, newStyleBlock);
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`✅ Updated: ${htmlPath}`);
  }

  // Chỉnh JS
  if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Chèn nút nếu chưa có
    if (!jsContent.includes('← Quay về')) {
      const lastDetail = jsContent.lastIndexOf('detailHTML +=');
      const insertIndex = jsContent.indexOf('`', lastDetail);
      const before = jsContent.slice(0, insertIndex + 1);
      const after = jsContent.slice(insertIndex + 1);
      jsContent = before + backButtonHTML + after;
      fs.writeFileSync(jsPath, jsContent, 'utf-8');
      console.log(`✅ Updated: ${jsPath}`);
    }
  }
}

// Duyệt qua tất cả unit
function walkUnits(baseDir) {
  const unitDirs = fs.readdirSync(baseDir);
  for (const unitName of unitDirs) {
    const unitPath = path.join(baseDir, unitName);
    const levelPath = path.join(unitPath, 'level');

    if (fs.existsSync(levelPath)) {
      const levels = fs.readdirSync(levelPath);
      for (const levelName of levels) {
        const fullLevelPath = path.join(levelPath, levelName);
        if (fs.statSync(fullLevelPath).isDirectory()) {
          processLevelDir(fullLevelPath, unitName, levelName);
        }
      }
    }
  }
}

// Run script
walkUnits(path.join(__dirname, 'unit'));

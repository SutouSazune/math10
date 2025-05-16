const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'unit');

// === CSS bạn muốn thay ===
const newCSS = `<style>
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
</style>`;


function replaceCSS(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const styleRegex = /<style[\s\S]*?<\/style>/;
  if (!styleRegex.test(content)) {
    console.warn(`⚠️ Không tìm thấy <style> trong ${filepath}`);
    return;
  }
  content = content.replace(styleRegex, newCSS);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`🎨 CSS updated: ${filepath}`);
}

function traverseAll() {
  const units = fs.readdirSync(ROOT_DIR).filter(name => !name.startsWith('.'));
  for (const unit of units) {
    const levelDir = path.join(ROOT_DIR, unit, 'level');
    if (!fs.existsSync(levelDir)) continue;

    const levels = fs.readdirSync(levelDir);
    for (const level of levels) {
      const folder = path.join(levelDir, level);
      const htmlPath = path.join(folder, 'index.html');

      if (fs.existsSync(htmlPath)) replaceCSS(htmlPath);
    }
  }
}

traverseAll();

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'unit');

const overlayHTML = `
    <div id="result-overlay" style="display: none">
      <div id="result-detail"></div>
    </div>`;

const overlayCSS = `
      <style>
      #result-detail {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        margin: 20px auto;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

      #result-detail {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        max-width: 700px;
        width: 90%;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        max-height: 80vh;
        overflow-y: auto;
      }
      </style>`;

function updateHtmlAndJs() {
  fs.readdir(rootDir, (err, units) => {
    if (err) return console.error("Lỗi đọc thư mục unit:", err);

    units.forEach(unit => {
      const levelDir = path.join(rootDir, unit, 'level');

      fs.readdir(levelDir, (err2, levels) => {
        if (err2) return;

        levels.forEach(level => {
          const folderPath = path.join(levelDir, level);
          const htmlPath = path.join(folderPath, 'index.html');
          const jsPath = path.join(folderPath, `U${unit}L${level}.js`);

          // === Update index.html ===
          fs.readFile(htmlPath, 'utf8', (err3, htmlData) => {
            if (err3) return console.error(`Không đọc được file HTML: ${htmlPath}`);

            let modifiedHtml = htmlData;

            // Thêm CSS vào trước </head>
            if (!modifiedHtml.includes('#result-overlay')) {
              modifiedHtml = modifiedHtml.replace('</head>', overlayCSS + '\n</head>');
            }

            // Thêm overlay vào <body>
            if (!modifiedHtml.includes('id="result-overlay"')) {
              modifiedHtml = modifiedHtml.replace('<body>', '<body>\n' + overlayHTML);
            }

            fs.writeFile(htmlPath, modifiedHtml, 'utf8', err => {
              if (err) console.error(`Lỗi ghi HTML: ${htmlPath}`);
              else console.log(`✅ Đã cập nhật: ${htmlPath}`);
            });
          });

          // === Update JS ===
          fs.readFile(jsPath, 'utf8', (err4, jsData) => {
            if (err4) return console.error(`Không đọc được JS: ${jsPath}`);

            const triggerLine = `if (lesson.length === 0) {`;
            const overlayTrigger = `document.getElementById('result-overlay').style.display = 'flex';`;

            if (jsData.includes(overlayTrigger)) return;

            const newJsData = jsData.replace(triggerLine, `${triggerLine}\n  ${overlayTrigger}`);

            fs.writeFile(jsPath, newJsData, 'utf8', err => {
              if (err) console.error(`Lỗi ghi JS: ${jsPath}`);
              else console.log(`✅ Đã cập nhật: ${jsPath}`);
            });
          });
        });
      });
    });
  });
}

updateHtmlAndJs();

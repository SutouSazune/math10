(() => {
  // -- TỰ ĐỘNG THÊM MathJax nếu chưa có
  if (!window.MathJax) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;
    document.head.appendChild(script);
  }

  function createFloatingButton(id, text, bottom, onclick) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.innerText = text;
    Object.assign(btn.style, {
      position: "fixed",
      right: "20px",
      bottom: bottom,
      zIndex: 9999,
      padding: "10px 14px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      fontWeight: "600",
      fontSize: "14px",
      userSelect: "none"
    });
    btn.onclick = onclick;
    document.body.appendChild(btn);
  }

  function createWindow(id, title, innerHTML, scriptContent) {
    const win = document.createElement("div");
    win.id = id;
    Object.assign(win.style, {
      position: "fixed",
      top: "60px",
      left: "60px",
      height: "412px",
      resize: "both",
      overflow: "auto",
      width: "500px",
      background: "#f5f7fa",
      border: "1px solid #888",
      borderRadius: "8px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      zIndex: 10000,
      userSelect: "none",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    });

    win.innerHTML = `
      <div style="background:#004080;color:#fff;padding:10px 12px;border-radius:8px 8px 0 0;cursor:move;display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:16px;">
        <span>${title}</span>
        <button aria-label="Đóng cửa sổ" title="Đóng" style="font-weight:bold; font-size:18px; color:#fff; background:none; border:none; cursor:pointer; user-select:none;">✖</button>
      </div>
      <div style="padding:10px; max-height: 480px; overflow:auto; background:#fff;"></div>
    `;

    const header = win.querySelector("div");
    const closeBtn = header.querySelector("button");
    const contentDiv = win.querySelector("div:nth-child(2)");

    closeBtn.onclick = () => (win.style.display = "none");

    contentDiv.innerHTML = innerHTML;

    document.body.appendChild(win);
    dragElement(win);

    if (scriptContent) {
      const script = document.createElement("script");
      script.textContent = scriptContent;
      contentDiv.appendChild(script);
    }
  }

  function dragElement(elmnt) {
    const header = elmnt.querySelector("div");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  // ---- GIẤY NHÁP (Scribble Ink) ----
  createFloatingButton("openScribble", "📝 Giấy nháp", "30px", () => {
    if (document.getElementById("scribbleWindow")) {
      const w = document.getElementById("scribbleWindow");
      w.style.display = "block";
      w.style.zIndex = 10000;
      return;
    }

    // Nội dung giấy nháp
    const scribbleHTML = `
      <style>
        #scribbleCanvas {
          border: 2px solid #004080;
          border-radius: 8px;
          background: white;
          touch-action: none;
          display: block;
          margin: 0 auto;
          cursor: crosshair;
        }
        #scribbleTools {
        position: absolute;
        bottom: 0;
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          user-select: none;
        }
        #scribbleTools button, #scribbleTools input[type=color], #scribbleTools input[type=range] {
          cursor: pointer;
          border-radius: 6px;
          border: 1px solid #004080;
          padding: 6px 12px;
          font-weight: 600;
          background: #e1ecf7;
          color: #003366;
          transition: background 0.3s ease;
        }
        #scribbleTools button:hover, #scribbleTools input[type=color]:hover, #scribbleTools input[type=range]:hover {
          background: #c4d8f6;
        }
        #scribbleTools button.active {
          background: #004080;
          color: white;
          border-color: #002050;
        }
        #scribbleTools label {
          font-size: 14px;
          color: #004080;
          margin-right: 4px;
          user-select: none;
        }
      </style>
      <canvas id="scribbleCanvas" style="width: 100%; height: 100%;" aria-label="Giấy nháp vẽ tay"></canvas>
      <div id="scribbleTools" role="group" aria-label="Các công cụ giấy nháp">
        <button id="penBtn" aria-pressed="true" title="Bút vẽ">✏️ Bút</button>
        <button id="eraserBtn" aria-pressed="false" title="Tẩy">🩹 Tẩy</button>
        <label for="colorPicker">Màu:</label>
        <input type="color" id="colorPicker" value="#000000" aria-label="Chọn màu bút">
        <label for="thicknessRange">Độ dày:</label>
        <input type="range" id="thicknessRange" min="1" max="30" value="4" aria-label="Chọn độ dày bút">
        <button id="undoBtn" title="Hoàn tác (Ctrl+Z)">↩️ Undo</button>
        <button id="redoBtn" title="Làm lại (Ctrl+Y)">↪️ Redo</button>
        <button id="clearBtn" title="Xóa hết">🗑️ Xóa hết</button>
        <button id="saveBtn" title="Lưu ảnh">💾 Lưu ảnh</button>
      </div>
    `;

    const scribbleScript = `
      (function(){
        const canvas = document.getElementById("scribbleCanvas");
        const ctx = canvas.getContext("2d");

        // Thiết lập canvas chuẩn
        const width = canvas.width;
        const height = canvas.height;

        // Trạng thái hiện tại
        let drawing = false;
        let erasing = false;
        let currentColor = document.getElementById("colorPicker").value;
        let currentThickness = parseInt(document.getElementById("thicknessRange").value);
        let undoStack = [];
        let redoStack = [];

        // Lưu trạng thái canvas hiện tại vào undo stack
        function saveState() {
          if(undoStack.length > 100) undoStack.shift();
          undoStack.push(canvas.toDataURL());
          // Mỗi khi vẽ mới, redo stack bị xóa
          redoStack = [];
          updateUndoRedoButtons();
        }

        // Load trạng thái từ undo/redo stack
        function restoreState(dataUrl) {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
          };
          img.src = dataUrl;
        }

        // Cập nhật trạng thái các nút undo/redo
        function updateUndoRedoButtons() {
          document.getElementById("undoBtn").disabled = undoStack.length === 0;
          document.getElementById("redoBtn").disabled = redoStack.length === 0;
        }

        // Bắt đầu vẽ hoặc tẩy
        function startDraw(x,y) {
          drawing = true;
          ctx.beginPath();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = currentThickness;
          ctx.strokeStyle = erasing ? "white" : currentColor;
          ctx.moveTo(x,y);
        }

        // Vẽ tiếp
        function drawMove(x,y) {
          if (!drawing) return;
          ctx.lineTo(x,y);
          ctx.stroke();
        }

        // Kết thúc vẽ/tẩy
        function endDraw() {
          if(drawing) {
            drawing = false;
            ctx.closePath();
            saveState();
          }
        }

        // Xử lý sự kiện chuột/touch
        function getPointerPos(e) {
  const rect = canvas.getBoundingClientRect();

  // Tính tỷ lệ scale thật so với CSS
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  if (e.touches) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    };
  } else {
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }
}


        // Event listeners vẽ
        canvas.addEventListener("mousedown", e => {
          const pos = getPointerPos(e);
          startDraw(pos.x,pos.y);
        });
        canvas.addEventListener("mousemove", e => {
          const pos = getPointerPos(e);
          drawMove(pos.x,pos.y);
        });
        canvas.addEventListener("mouseup", endDraw);
        canvas.addEventListener("mouseleave", endDraw);

        // Touch events
        canvas.addEventListener("touchstart", e => {
          e.preventDefault();
          const pos = getPointerPos(e);
          startDraw(pos.x,pos.y);
        }, { passive: false });
        canvas.addEventListener("touchmove", e => {
          e.preventDefault();
          const pos = getPointerPos(e);
          drawMove(pos.x,pos.y);
        }, { passive: false });
        canvas.addEventListener("touchend", e => {
          e.preventDefault();
          endDraw();
        }, { passive: false });

        // Nút bút và tẩy
        const penBtn = document.getElementById("penBtn");
        const eraserBtn = document.getElementById("eraserBtn");

        penBtn.onclick = () => {
          erasing = false;
          penBtn.classList.add("active");
          penBtn.setAttribute("aria-pressed", "true");
          eraserBtn.classList.remove("active");
          eraserBtn.setAttribute("aria-pressed", "false");
        };
        eraserBtn.onclick = () => {
          erasing = true;
          eraserBtn.classList.add("active");
          eraserBtn.setAttribute("aria-pressed", "true");
          penBtn.classList.remove("active");
          penBtn.setAttribute("aria-pressed", "false");
        };

        // Thay đổi màu
        const colorPicker = document.getElementById("colorPicker");
        colorPicker.oninput = e => {
          currentColor = e.target.value;
          if (!erasing) {
            // Cập nhật màu nếu đang ở chế độ bút
          }
        };

        // Thay đổi độ dày
        const thicknessRange = document.getElementById("thicknessRange");
        thicknessRange.oninput = e => {
          currentThickness = parseInt(e.target.value);
        };

        // Undo
        document.getElementById("undoBtn").onclick = () => {
          if(undoStack.length > 0) {
            redoStack.push(canvas.toDataURL());
            const dataUrl = undoStack.pop();
            restoreState(dataUrl);
            updateUndoRedoButtons();
          }
        };

        // Redo
        document.getElementById("redoBtn").onclick = () => {
          if(redoStack.length > 0) {
            undoStack.push(canvas.toDataURL());
            const dataUrl = redoStack.pop();
            restoreState(dataUrl);
            updateUndoRedoButtons();
          }
        };

        // Xóa hết
        document.getElementById("clearBtn").onclick = () => {
          ctx.clearRect(0, 0, width, height);
          saveState();
        };

        // Lưu ảnh
        document.getElementById("saveBtn").onclick = () => {
          const link = document.createElement("a");
          link.download = "giaynhap.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };

        // Khởi tạo lưu trạng thái ban đầu (trắng)
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        saveState();

        // Hỗ trợ phím Ctrl+Z / Ctrl+Y
        window.addEventListener("keydown", (e) => {
          if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
            e.preventDefault();
            document.getElementById("undoBtn").click();
          } else if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
            e.preventDefault();
            document.getElementById("redoBtn").click();
          }
        });
      })();
    `;

    createWindow("scribbleWindow", "Giấy nháp Scribble Ink", scribbleHTML, scribbleScript);
  });

})();

let units = JSON.parse(localStorage.getItem("units")) || [
  {
    id: 1,
    name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
    levels: [
      {
        name: "Phương trình bậc nhất hai ẩn",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Hệ hai phương trình bậc nhất hai ẩn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Vận dụng",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 2,
    name: "Giải hệ hai phương trình bậc nhất hai ẩn",
    levels: [
      {
        name: "Phương pháp thế",
        state: "lock",
        complete: "false",
      },
      {
        name: "Phương pháp cộng đại số",
        state: "lock",
        complete: "false",
      },
      {
        name: "Vận dụng",
        state: "lock",
        complete: "false",
      },
      {
        name: "Luyện tập chung",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 3,
    name: "Giải bài toán bằng cách lập hệ phương trình",
    levels: [
      {
        name: "Luyện tập",
        state: "lock",
        complete: "false",
      },
      { name: "Bài tập cuối chương I", state: "lock", complete: "false" },
    ],
  },
  {
    id: 4,
    name: "Phương trình quy về phương trình bậc nhất một ẩn",
    levels: [
      {
        name: "Phương trình tích",
        state: "lock",
        complete: "false",
      },
      {
        name: "Phương trình chứa ẩn ở mẫu",
        state: "lock",
        complete: "false",
      },
      {
        name: "Bài tập",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 5,
    name: "Bất đẳng thức và tính chất",
    levels: [
      { name: "Bất đẳng thức", state: "lock", complete: "false" },
      {
        name: "Liên hệ giữa thứ tự và phép cộng",
        state: "lock",
        complete: "false",
      },
      {
        name: "Liên hệ giữa thứ tự và phép nhân",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
    ],
  },
  {
    id: 6,
    name: "Bất phương trình bậc nhất một ẩn",
    levels: [
      {
        name: "Khái niệm bất phương trình bậc nhất một ẩn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Cách giải bất phương trình bậc nhất một ẩn",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương II", state: "lock", complete: "false" },
    ],
  },
  {
    id: 7,
    name: "Căn bậc hai và căn thức bậc hai",
    levels: [
      { name: "Căn bậc hai", state: "lock", complete: "false" },
      { name: "Căn thức bậc hai", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 8,
    name: "Khai căn bậc hai với phép nhân và phép chia",
    levels: [
      {
        name: "Khai căn bậc hai và phép nhân",
        state: "lock",
        complete: "false",
      },
      {
        name: "Khai căn bậc hai và phép chia",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 9,
    name: "Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
    levels: [
      {
        name: "Đưa thừa số ra ngoài dấu căn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Đưa thừa số vào trong đâu căn",
        state: "lock",
        complete: "false",
      },
      { name: "Trục căn thức ở mẫu", state: "lock", complete: "false" },
      {
        name: "Rút gọn biểu thức chứa căn thức bậc hai",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 10,
    name: "Căn bậc ba và căn thức bậc ba",
    levels: [
      { name: "Căn bậc ba", state: "lock", complete: "false" },
      { name: "Căn thức bậc ba", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương III", state: "lock", complete: "false" },
    ],
  },
  {
    id: 11,
    name: "Tỉ số lượng giác của góc nhọn",
    levels: [
      {
        name: "Khái niệm tỉ số lượng giác của một góc nhọn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Tỉ số lượng giác của hai góc phụ nhau",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 12,
    name: "Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
    levels: [
      {
        name: "Hệ thức giữa cạnh huyền và cạnh góc vuông",
        state: "lock",
        complete: "false",
      },
      {
        name: "Hệ thức giữa hai cạnh góc vuông",
        state: "lock",
        complete: "false",
      },
      { name: "Giải tam giác vuông", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương IV", state: "lock", complete: "false" },
    ],
  },
  {
    id: 13,
    name: "Mở đầu về đường tròn",
    levels: [{ name: "Đường tròn", state: "lock", complete: "false" }],
  },
  {
    id: 14,
    name: "Cung và dây của một đường tròn",
    levels: [
      {
        name: "Dây và đường kính của đường tròn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Góc ở tâm, cung và số đo của một cung",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 15,
    name: `Độ dài của cung tròn <br> Diện tích hình quạt tròn và 
        hình vành khuyên`,
    levels: [
      { name: "Độ dài của cung tròn", state: "lock", complete: "false" },
      {
        name: "Hình quạt tròn và hình vành khuyên",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
    ],
  },
  {
    id: 16,
    name: `Vị trí tương đối của đường thẳng và đường tròn`,
    levels: [
      {
        name: "Vị trí tương đối của đường thẳng và đường tròn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Hai tiếp tuyến cắt nhau của một đường tròn",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 17,
    name: `Vị trí tương đối của hai đường tròn`,
    levels: [
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương V", state: "lock", complete: "false" },
    ],
  },
  {
    id: 18,
    name: `Hàm số y = ax² (a ≠ 0)`,
    levels: [
      { name: "Hàm số y = ax² (a ≠ 0)", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 19,
    name: `Phương trình bậc hai một ẩn`,
    levels: [
      {
        name: "Định nghĩa phương trình bậc hai một ẩn",
        state: "lock",
        complete: "false",
      },
      {
        name: "Cách giải phương trình bậc hai một ẩn có dạng đặc biệt",
        state: "lock",
        complete: "false",
      },
      {
        name: "Công thức nghiệm của phương trình bậc hai",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
    ],
  },
  {
    id: 20,
    name: `Định lí viete và ứng dụng`,
    levels: [
      { name: "Định lí viete", state: "lock", complete: "false" },
      { name: "Áp dụng định lí viete", state: "lock", complete: "false" },
      {
        name: "Tìm hai số khi biết tổng và tích của chúng",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 21,
    name: `Giải bài toán bằng cách lập phương trình`,
    levels: [
      { name: "Bài tập", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương VI", state: "lock", complete: "false" },
    ],
  },
  {
    id: 22,
    name: `Bảng tần số và biểu đồ tần số`,
    levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
  },
  {
    id: 23,
    name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
    levels: [
      { name: "Bảng tần số tương đối", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 24,
    name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
    levels: [
      {
        name: "Bảng tần số, tần số tương đối ghép nhóm",
        state: "lock",
        complete: "false",
      },
      { name: "Bài tập cuối chương VII", state: "lock", complete: "false" },
    ],
  },
  {
    id: 25,
    name: `Phép thử ngẫu nhiên và không gian mẫu`,
    levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
  },
  {
    id: 26,
    name: `Xác suất của biến cố có liên quan tới phép thử`,
    levels: [
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương VIII", state: "lock", complete: "false" },
    ],
  },
  {
    id: 27,
    name: `Góc nội tiếp`,
    levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
  },
  {
    id: 28,
    name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
    levels: [
      {
        name: "Đường tròn ngoại tiếp một tam giác",
        state: "lock",
        complete: "false",
      },
      {
        name: "Đường tròn nội tiếp một tam giác",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 29,
    name: `Tứ giác nội tiếp`,
    levels: [
      {
        name: "Đường tròn ngoại tiếp một tứ giác",
        state: "lock",
        complete: "false",
      },
      {
        name: "Đường tròn ngoại tiếp hình chữ nhật và hình vuông",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 30,
    name: `Đa giác đều`,
    levels: [
      { name: "Đa giác đều", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương IX", state: "lock", complete: "false" },
    ],
  },
  {
    id: 31,
    name: `Hình trụ và hình nón`,
    levels: [
      { name: "Hình trụ", state: "lock", complete: "false" },
      { name: "Hình nón", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 32,
    name: `Hình cầu`,
    levels: [
      {
        name: "Diện tích mặt cầu và thể tích hình cầu",
        state: "lock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương X", state: "lock", complete: "false" },
    ],
  },
];

localStorage.setItem("units", JSON.stringify(units));

function displayUnits() {
  let html = `<h1>Chinh phục toán 9 và đề thi Toán tuyển sinh vào 10</h1>`;
  units.forEach((unit, index) => {
    const { id, name, levels } = unit;
    html += `
            <div class="unit">
                <div class="unit-line">
                    <div class="unit-name">
                        ${name}
                    </div>
                </div>        
                <div class="unit-levels">
        `;
    levels.forEach((level, idx) => {
      html += `
                <div class="level">
                    <div class="level-btn ${level.state}-level unit${
        index + 1
      }-level${idx + 1}">
                    </div>
                    <div class="intro-level">
                        <span class="level-name">${level.name}</span>
                        <a class="start-btn" href="unit/${index + 1}/level/${
        idx + 1
      }">Bắt đầu</a>
                    </div>
                </div>
            `;
    });
    html += `
                </div>
            </div>
        `;
  });
  document.querySelector(".mid-section").innerHTML = html;
}

// =======

//get unit and level
function getUnitAndLevel() {
  const pathParts = window.location.pathname.split("/");
  const unitIndex = pathParts.indexOf("unit");
  const levelIndex = pathParts.indexOf("level");

  if (unitIndex !== -1 && levelIndex !== -1) {
    const unit = parseInt(pathParts[unitIndex + 1], 10); // Get the unit number
    const level = parseInt(pathParts[levelIndex + 1], 10); // Get the level number
    return { unit, level };
  }

  return { unit: null, level: null }; // Return null if not found
}

//check is lvl complete
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  units.forEach((unit, unitIndex) => {
    unit.levels.forEach((level, levelIndex) => {
      const paramKey = `unit${unit.id}-level${levelIndex + 1}`;
      const levelElement = document.querySelector(
        `.unit${unitIndex + 1}-level${levelIndex + 1}`
      );

      if (levelElement) {
        const isCompleteFromParams = params.get(paramKey) === "complete";
        const isCompleteFromStorage = level.complete === "true";

        if (isCompleteFromParams || isCompleteFromStorage) {
          levelElement.classList.add("complete");
          console.log(
            `Added 'complete' class to .unit${unitIndex + 1}-level${
              levelIndex + 1
            }`
          );

          // Update localStorage if param exists
          if (isCompleteFromParams) {
            units[unitIndex].levels[levelIndex].complete = "true";
          }
        }
      }
    });
  });

  localStorage.setItem("units", JSON.stringify(units));
  console.log(
    "Updated 'complete' status in localStorage for all levels based on URL params or storage."
  );
});

function update(unitIndex, levelIndex, state, complete) {
  // Adjust indices to match 1-based input
  const adjustedUnitIndex = unitIndex - 1;
  const adjustedLevelIndex = levelIndex - 1;
  let cur_state = "wsp";
  let cur_complete = "wsp";

  if (
    units[adjustedUnitIndex] &&
    units[adjustedUnitIndex].levels[adjustedLevelIndex]
  ) {
    units[adjustedUnitIndex].levels[adjustedLevelIndex].state =
      state === 1 ? "unlock" : "lock";
    units[adjustedUnitIndex].levels[adjustedLevelIndex].complete =
      complete === 1 ? "true" : "false";
    if (state === 1) {
      cur_state = "unlock";
    } else if (state === 0) {
      cur_state = "lock";
    }
    if (complete === 1) {
      cur_complete = "true";
    } else if (complete === 0) {
      cur_complete = "false";
    }
    localStorage.setItem("units", JSON.stringify(units));
    console.log(
      `Unit ${unitIndex}, Level ${levelIndex} updated: state=${cur_state}, complete=${cur_complete}`
    );
  } else {
    console.error(
      `Invalid unitIndex (${unitIndex}) or levelIndex (${levelIndex})`
    );
  }
  window.location.href = "/learn/";
}
// ======
function addEvent() {
  // Lấy tất cả các level-btn có trạng thái unlock
  const levelButtons = document.querySelectorAll(".level-btn.unlock-level");

  levelButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      // Ẩn tất cả các intro-level
      document.querySelectorAll(".intro-level").forEach((intro) => {
        intro.classList.remove("show");
        intro.style.display = "none";
      });

      // Hiển thị intro-level tương ứng
      console.log("show");
      const introLevel = btn.nextElementSibling;
      if (introLevel) {
        introLevel.style.display = "flex"; // Hiển thị flex trước
        requestAnimationFrame(() => {
          introLevel.classList.add("show"); // Thêm hiệu ứng phóng to
        });
      }
    });
  });
}

// Gọi hàm sau khi hiển thị nội dung
// resetUnits();
displayUnits();
addEvent();
saveScrollPosition();
// Check if the element exists before calling addIdentity
let rightSection = document.querySelector(".right-section");
if (!rightSection) {
  rightSection = document.createElement("div");
  rightSection.classList.add("right-section");
  document.body.appendChild(rightSection);
}
addIdentity();

function resetProgress() {
  units = [
    {
      id: 1,
      name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
      levels: [
        {
          name: "Phương trình bậc nhất hai ẩn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Hệ hai phương trình bậc nhất hai ẩn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Vận dụng",
          state: "lock",
          complete: "false",
        },
      ],
    },
    {
      id: 2,
      name: "Giải hệ hai phương trình bậc nhất hai ẩn",
      levels: [
        {
          name: "Phương pháp thế",
          state: "lock",
          complete: "false",
        },
        {
          name: "Phương pháp cộng đại số",
          state: "lock",
          complete: "false",
        },
        {
          name: "Vận dụng",
          state: "lock",
          complete: "false",
        },
        {
          name: "Luyện tập chung",
          state: "lock",
          complete: "false",
        },
      ],
    },
    {
      id: 3,
      name: "Giải bài toán bằng cách lập hệ phương trình",
      levels: [
        {
          name: "Luyện tập",
          state: "lock",
          complete: "false",
        },
        { name: "Bài tập cuối chương I", state: "lock", complete: "false" },
      ],
    },
    {
      id: 4,
      name: "Phương trình quy về phương trình bậc nhất một ẩn",
      levels: [
        {
          name: "Phương trình tích",
          state: "lock",
          complete: "false",
        },
        {
          name: "Phương trình chứa ẩn ở mẫu",
          state: "lock",
          complete: "false",
        },
        {
          name: "Bài tập",
          state: "lock",
          complete: "false",
        },
      ],
    },
    {
      id: 5,
      name: "Bất đẳng thức và tính chất",
      levels: [
        { name: "Bất đẳng thức", state: "lock", complete: "false" },
        {
          name: "Liên hệ giữa thứ tự và phép cộng",
          state: "lock",
          complete: "false",
        },
        {
          name: "Liên hệ giữa thứ tự và phép nhân",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Luyện tập chung", state: "lock", complete: "false" },
      ],
    },
    {
      id: 6,
      name: "Bất phương trình bậc nhất một ẩn",
      levels: [
        {
          name: "Khái niệm bất phương trình bậc nhất một ẩn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Cách giải bất phương trình bậc nhất một ẩn",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương II", state: "lock", complete: "false" },
      ],
    },
    {
      id: 7,
      name: "Căn bậc hai và căn thức bậc hai",
      levels: [
        { name: "Căn bậc hai", state: "lock", complete: "false" },
        { name: "Căn thức bậc hai", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 8,
      name: "Khai căn bậc hai với phép nhân và phép chia",
      levels: [
        {
          name: "Khai căn bậc hai và phép nhân",
          state: "lock",
          complete: "false",
        },
        {
          name: "Khai căn bậc hai và phép chia",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 9,
      name: "Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
      levels: [
        {
          name: "Đưa thừa số ra ngoài dấu căn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Đưa thừa số vào trong đâu căn",
          state: "lock",
          complete: "false",
        },
        { name: "Trục căn thức ở mẫu", state: "lock", complete: "false" },
        {
          name: "Rút gọn biểu thức chứa căn thức bậc hai",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 10,
      name: "Căn bậc ba và căn thức bậc ba",
      levels: [
        { name: "Căn bậc ba", state: "lock", complete: "false" },
        { name: "Căn thức bậc ba", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Luyện tập chung", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương III", state: "lock", complete: "false" },
      ],
    },
    {
      id: 11,
      name: "Tỉ số lượng giác của góc nhọn",
      levels: [
        {
          name: "Khái niệm tỉ số lượng giác của một góc nhọn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Tỉ số lượng giác của hai góc phụ nhau",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 12,
      name: "Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
      levels: [
        {
          name: "Hệ thức giữa cạnh huyền và cạnh góc vuông",
          state: "lock",
          complete: "false",
        },
        {
          name: "Hệ thức giữa hai cạnh góc vuông",
          state: "lock",
          complete: "false",
        },
        { name: "Giải tam giác vuông", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Luyện tập chung", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương IV", state: "lock", complete: "false" },
      ],
    },
    {
      id: 13,
      name: "Mở đầu về đường tròn",
      levels: [{ name: "Đường tròn", state: "lock", complete: "false" }],
    },
    {
      id: 14,
      name: "Cung và dây của một đường tròn",
      levels: [
        {
          name: "Dây và đường kính của đường tròn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Góc ở tâm, cung và số đo của một cung",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 15,
      name: `Độ dài của cung tròn <br> Diện tích hình quạt tròn và 
        hình vành khuyên`,
      levels: [
        { name: "Độ dài của cung tròn", state: "lock", complete: "false" },
        {
          name: "Hình quạt tròn và hình vành khuyên",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Luyện tập chung", state: "lock", complete: "false" },
      ],
    },
    {
      id: 16,
      name: `Vị trí tương đối của đường thẳng và đường tròn`,
      levels: [
        {
          name: "Vị trí tương đối của đường thẳng và đường tròn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Hai tiếp tuyến cắt nhau của một đường tròn",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 17,
      name: `Vị trí tương đối của hai đường tròn`,
      levels: [
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương V", state: "lock", complete: "false" },
      ],
    },
    {
      id: 18,
      name: `Hàm số y = ax² (a ≠ 0)`,
      levels: [
        { name: "Hàm số y = ax² (a ≠ 0)", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 19,
      name: `Phương trình bậc hai một ẩn`,
      levels: [
        {
          name: "Định nghĩa phương trình bậc hai một ẩn",
          state: "lock",
          complete: "false",
        },
        {
          name: "Cách giải phương trình bậc hai một ẩn có dạng đặc biệt",
          state: "lock",
          complete: "false",
        },
        {
          name: "Công thức nghiệm của phương trình bậc hai",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Luyện tập chung", state: "lock", complete: "false" },
      ],
    },
    {
      id: 20,
      name: `Định lí viete và ứng dụng`,
      levels: [
        { name: "Định lí viete", state: "lock", complete: "false" },
        { name: "Áp dụng định lí viete", state: "lock", complete: "false" },
        {
          name: "Tìm hai số khi biết tổng và tích của chúng",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 21,
      name: `Giải bài toán bằng cách lập phương trình`,
      levels: [
        { name: "Bài tập", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương VI", state: "lock", complete: "false" },
      ],
    },
    {
      id: 22,
      name: `Bảng tần số và biểu đồ tần số`,
      levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
    },
    {
      id: 23,
      name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
      levels: [
        { name: "Bảng tần số tương đối", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 24,
      name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
      levels: [
        {
          name: "Bảng tần số, tần số tương đối ghép nhóm",
          state: "lock",
          complete: "false",
        },
        { name: "Bài tập cuối chương VII", state: "lock", complete: "false" },
      ],
    },
    {
      id: 25,
      name: `Phép thử ngẫu nhiên và không gian mẫu`,
      levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
    },
    {
      id: 26,
      name: `Xác suất của biến cố có liên quan tới phép thử`,
      levels: [
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương VIII", state: "lock", complete: "false" },
      ],
    },
    {
      id: 27,
      name: `Góc nội tiếp`,
      levels: [{ name: "Vận dụng", state: "lock", complete: "false" }],
    },
    {
      id: 28,
      name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
      levels: [
        {
          name: "Đường tròn ngoại tiếp một tam giác",
          state: "lock",
          complete: "false",
        },
        {
          name: "Đường tròn nội tiếp một tam giác",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 29,
      name: `Tứ giác nội tiếp`,
      levels: [
        {
          name: "Đường tròn ngoại tiếp một tứ giác",
          state: "lock",
          complete: "false",
        },
        {
          name: "Đường tròn ngoại tiếp hình chữ nhật và hình vuông",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 30,
      name: `Đa giác đều`,
      levels: [
        { name: "Đa giác đều", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương IX", state: "lock", complete: "false" },
      ],
    },
    {
      id: 31,
      name: `Hình trụ và hình nón`,
      levels: [
        { name: "Hình trụ", state: "lock", complete: "false" },
        { name: "Hình nón", state: "lock", complete: "false" },
        { name: "Vận dụng", state: "lock", complete: "false" },
      ],
    },
    {
      id: 32,
      name: `Hình cầu`,
      levels: [
        {
          name: "Diện tích mặt cầu và thể tích hình cầu",
          state: "lock",
          complete: "false",
        },
        { name: "Vận dụng", state: "lock", complete: "false" },
        { name: "Bài tập cuối chương X", state: "lock", complete: "false" },
      ],
    },
  ];
  console.log("Resetted all the progress!");
  localStorage.setItem("units", JSON.stringify(units));
  window.location.href = "/learn/";
}

function unlockAllUnits() {
  units = [
    {
      id: 1,
      name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
      levels: [
        {
          name: "Phương trình bậc nhất hai ẩn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Hệ hai phương trình bậc nhất hai ẩn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Vận dụng",
          state: "unlock",
          complete: "false",
        },
      ],
    },
    {
      id: 2,
      name: "Giải hệ hai phương trình bậc nhất hai ẩn",
      levels: [
        {
          name: "Phương pháp thế",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Phương pháp cộng đại số",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Vận dụng",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Luyện tập chung",
          state: "unlock",
          complete: "false",
        },
      ],
    },
    {
      id: 3,
      name: "Giải bài toán bằng cách lập hệ phương trình",
      levels: [
        {
          name: "Luyện tập",
          state: "unlock",
          complete: "false",
        },
        { name: "Bài tập cuối chương I", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 4,
      name: "Phương trình quy về phương trình bậc nhất một ẩn",
      levels: [
        {
          name: "Phương trình tích",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Phương trình chứa ẩn ở mẫu",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Bài tập",
          state: "unlock",
          complete: "false",
        },
      ],
    },
    {
      id: 5,
      name: "Bất đẳng thức và tính chất",
      levels: [
        { name: "Bất đẳng thức", state: "unlock", complete: "false" },
        {
          name: "Liên hệ giữa thứ tự và phép cộng",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Liên hệ giữa thứ tự và phép nhân",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Luyện tập chung", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 6,
      name: "Bất phương trình bậc nhất một ẩn",
      levels: [
        {
          name: "Khái niệm bất phương trình bậc nhất một ẩn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Cách giải bất phương trình bậc nhất một ẩn",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương II", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 7,
      name: "Căn bậc hai và căn thức bậc hai",
      levels: [
        { name: "Căn bậc hai", state: "unlock", complete: "false" },
        { name: "Căn thức bậc hai", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 8,
      name: "Khai căn bậc hai với phép nhân và phép chia",
      levels: [
        {
          name: "Khai căn bậc hai và phép nhân",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Khai căn bậc hai và phép chia",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 9,
      name: "Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
      levels: [
        {
          name: "Đưa thừa số ra ngoài dấu căn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Đưa thừa số vào trong đâu căn",
          state: "unlock",
          complete: "false",
        },
        { name: "Trục căn thức ở mẫu", state: "unlock", complete: "false" },
        {
          name: "Rút gọn biểu thức chứa căn thức bậc hai",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 10,
      name: "Căn bậc ba và căn thức bậc ba",
      levels: [
        { name: "Căn bậc ba", state: "unlock", complete: "false" },
        { name: "Căn thức bậc ba", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Luyện tập chung", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương III", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 11,
      name: "Tỉ số lượng giác của góc nhọn",
      levels: [
        {
          name: "Khái niệm tỉ số lượng giác của một góc nhọn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Tỉ số lượng giác của hai góc phụ nhau",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 12,
      name: "Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
      levels: [
        {
          name: "Hệ thức giữa cạnh huyền và cạnh góc vuông",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Hệ thức giữa hai cạnh góc vuông",
          state: "unlock",
          complete: "false",
        },
        { name: "Giải tam giác vuông", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Luyện tập chung", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương IV", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 13,
      name: "Mở đầu về đường tròn",
      levels: [{ name: "Đường tròn", state: "unlock", complete: "false" }],
    },
    {
      id: 14,
      name: "Cung và dây của một đường tròn",
      levels: [
        {
          name: "Dây và đường kính của đường tròn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Góc ở tâm, cung và số đo của một cung",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 15,
      name: `Độ dài của cung tròn <br> Diện tích hình quạt tròn và 
            hình vành khuyên`,
      levels: [
        { name: "Độ dài của cung tròn", state: "unlock", complete: "false" },
        {
          name: "Hình quạt tròn và hình vành khuyên",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Luyện tập chung", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 16,
      name: `Vị trí tương đối của đường thẳng và đường tròn`,
      levels: [
        {
          name: "Vị trí tương đối của đường thẳng và đường tròn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Hai tiếp tuyến cắt nhau của một đường tròn",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 17,
      name: `Vị trí tương đối của hai đường tròn`,
      levels: [
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương V", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 18,
      name: `Hàm số y = ax² (a ≠ 0)`,
      levels: [
        { name: "Hàm số y = ax² (a ≠ 0)", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 19,
      name: `Phương trình bậc hai một ẩn`,
      levels: [
        {
          name: "Định nghĩa phương trình bậc hai một ẩn",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Cách giải phương trình bậc hai một ẩn có dạng đặc biệt",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Công thức nghiệm của phương trình bậc hai",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Luyện tập chung", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 20,
      name: `Định lí viete và ứng dụng`,
      levels: [
        { name: "Định lí viete", state: "unlock", complete: "false" },
        { name: "Áp dụng định lí viete", state: "unlock", complete: "false" },
        {
          name: "Tìm hai số khi biết tổng và tích của chúng",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 21,
      name: `Giải bài toán bằng cách lập phương trình`,
      levels: [
        { name: "Bài tập", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương VI", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 22,
      name: `Bảng tần số và biểu đồ tần số`,
      levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
    },
    {
      id: 23,
      name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
      levels: [
        { name: "Bảng tần số tương đối", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 24,
      name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
      levels: [
        {
          name: "Bảng tần số, tần số tương đối ghép nhóm",
          state: "unlock",
          complete: "false",
        },
        { name: "Bài tập cuối chương VII", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 25,
      name: `Phép thử ngẫu nhiên và không gian mẫu`,
      levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
    },
    {
      id: 26,
      name: `Xác suất của biến cố có liên quan tới phép thử`,
      levels: [
        { name: "Vận dụng", state: "unlock", complete: "false" },
        {
          name: "Bài tập cuối chương VIII",
          state: "unlock",
          complete: "false",
        },
      ],
    },
    {
      id: 27,
      name: `Góc nội tiếp`,
      levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
    },
    {
      id: 28,
      name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
      levels: [
        {
          name: "Đường tròn ngoại tiếp một tam giác",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Đường tròn nội tiếp một tam giác",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 29,
      name: `Tứ giác nội tiếp`,
      levels: [
        {
          name: "Đường tròn ngoại tiếp một tứ giác",
          state: "unlock",
          complete: "false",
        },
        {
          name: "Đường tròn ngoại tiếp hình chữ nhật và hình vuông",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 30,
      name: `Đa giác đều`,
      levels: [
        { name: "Đa giác đều", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương IX", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 31,
      name: `Hình trụ và hình nón`,
      levels: [
        { name: "Hình trụ", state: "unlock", complete: "false" },
        { name: "Hình nón", state: "unlock", complete: "false" },
        { name: "Vận dụng", state: "unlock", complete: "false" },
      ],
    },
    {
      id: 32,
      name: `Hình cầu`,
      levels: [
        {
          name: "Diện tích mặt cầu và thể tích hình cầu",
          state: "unlock",
          complete: "false",
        },
        { name: "Vận dụng", state: "unlock", complete: "false" },
        { name: "Bài tập cuối chương X", state: "unlock", complete: "false" },
      ],
    },
  ];
  console.log("Unlocked all the level!");
  localStorage.setItem("units", JSON.stringify(units));
  window.location.href = "/learn/";
}

function saveScrollPosition() {
  // Lưu lại vị trí cuộn khi người dùng rời khỏi trang
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("scrollPosition", window.scrollY);
  });

  // Khôi phục lại vị trí cuộn khi trang được tải lại
  window.addEventListener("load", function () {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition)); // Cuộn về vị trí đã lưu
    }
  });
}

// function addIdentity() {
//     let identitys = [
//         "(a + b)² = a² + b² + 2ab",
//         "(a - b)² = a² + b² - 2ab",
//         "a² - b² = (a - b)(a + b)",
//         "(a + b)³ = a³ + b³ + 3ab(a + b)",
//         "(a - b)³ = a³ - b³ - 3ab(a - b)",
//         "a³ + b³ = (a + b)(a² - ab + b²)",
//         "a³ - b³ = (a - b)(a² + ab + b²)"
//     ];
//     let html = `<h1>7 hằng đằng thức đáng nhớ</h1>`;
//     identitys.forEach(identity => {
//         html += `
//             <div class="identity">${identity}</div>
//         `;
//     })
//     const rightSection = document.querySelector('.right-section');
//     rightSection.innerHTML = html;
// }

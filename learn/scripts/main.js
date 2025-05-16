// 
let units = JSON.parse(localStorage.getItem("units")) || [
  {
    id: 1,
    name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
    category: "Phương trình và hệ phương trình",
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
    category: "Phương trình và hệ phương trình",
    levels: [
      {
        name: "Phương pháp thế",
        state: "unlock",
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
    category: "Phương trình và hệ phương trình",
    levels: [
      {
        name: "Luyện tập",
        state: "unlock",
        complete: "false",
      },
      { name: "Bài tập cuối chương I", state: "lock", complete: "false" },
    ],
  },
  {
    id: 4,
    name: "Phương trình quy về phương trình bậc nhất một ẩn",
    category: "Phương trình và hệ phương trình",
    levels: [
      {
        name: "Phương trình tích",
        state: "unlock",
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
    category: "Bất đẳng thức và bất phương trình",
    levels: [
      { name: "Bất đẳng thức", state: "lock", complete: "false" },
      {
        name: "Liên hệ giữa thứ tự và phép cộng",
        state: "unlock",
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
    category: "Bất đẳng thức và bất phương trình",
    levels: [
      {
        name: "Khái niệm bất phương trình bậc nhất một ẩn",
        state: "unlock",
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
    category: "Căn thức và biến đổi căn thức",
    levels: [
      { name: "Căn bậc hai", state: "unlock", complete: "false" },
      { name: "Căn thức bậc hai", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 8,
    name: "Khai căn bậc hai với phép nhân và phép chia",
    category: "Căn thức và biến đổi căn thức",
    levels: [
      {
        name: "Khai căn bậc hai và phép nhân",
        state: "unlock",
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
    category: "Căn thức và biến đổi căn thức",
    levels: [
      {
        name: "Đưa thừa số ra ngoài dấu căn",
        state: "unlock",
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
    category: "Căn thức và biến đổi căn thức",
    levels: [
      { name: "Căn bậc ba", state: "unlock", complete: "false" },
      { name: "Căn thức bậc ba", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương III", state: "lock", complete: "false" },
    ],
  },
  {
    id: 11,
    name: "Tỉ số lượng giác của góc nhọn",
    category: "Lượng giác",
    levels: [
      {
        name: "Khái niệm tỉ số lượng giác của một góc nhọn",
        state: "unlock",
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
    category: "Lượng giác",
    levels: [
      {
        name: "Hệ thức giữa cạnh huyền và cạnh góc vuông",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Hệ thức giữa hai cạnh góc vuông",
        state: "lock",
        complete: "false",
      },
      { name: "Giải tam giác vuông", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Luyện tập chung", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương IV", state: "lock", complete: "false" },
    ],
  },
  {
    id: 13,
    name: "Mở đầu về đường tròn",
    category: "Hình học đường tròn",
    levels: [{ name: "Đường tròn", state: "unlock", complete: "false" }],
  },
  {
    id: 14,
    name: "Cung và dây của một đường tròn",
    category: "Hình học đường tròn",
    levels: [
      {
        name: "Dây và đường kính của đường tròn",
        state: "unlock",
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
    category: "Hình học đường tròn",
    levels: [
      { name: "Độ dài của cung tròn", state: "unlock", complete: "false" },
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
    category: "Hình học đường tròn",
    levels: [
      {
        name: "Vị trí tương đối của đường thẳng và đường tròn",
        state: "unlock",
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
    category: "Hình học đường tròn",
    levels: [
      { name: "Vận dụng", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương V", state: "lock", complete: "false" },
    ],
  },
  {
    id: 18,
    name: `Hàm số y = ax² (a ≠ 0)`,
    category: "Hàm số và đồ thị",
    levels: [
      { name: "Hàm số y = ax² (a ≠ 0)", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 19,
    name: `Phương trình bậc hai một ẩn`,
    category: "Phương trình và hệ phương trình",
    levels: [
      {
        name: "Định nghĩa phương trình bậc hai một ẩn",
        state: "unlock",
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
    category: "Phương trình và hệ phương trình",
    levels: [
      { name: "Định lí viete", state: "unlock", complete: "false" },
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
    category: "Phương trình và hệ phương trình",
    levels: [
      { name: "Bài tập", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương VI", state: "lock", complete: "false" },
    ],
  },
  {
    id: 22,
    name: `Bảng tần số và biểu đồ tần số`,
    category: "Thống kê",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 23,
    name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
    category: "Thống kê",
    levels: [
      { name: "Bảng tần số tương đối", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 24,
    name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
    category: "Thống kê",
    levels: [
      {
        name: "Bảng tần số, tần số tương đối ghép nhóm",
        state: "unlock",
        complete: "false",
      },
      { name: "Bài tập cuối chương VII", state: "lock", complete: "false" },
    ],
  },
  {
    id: 25,
    name: `Phép thử ngẫu nhiên và không gian mẫu`,
    category: "Xác suất",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 26,
    name: `Xác suất của biến cố có liên quan tới phép thử`,
    category: "Xác suất",
    levels: [
      { name: "Vận dụng", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương VIII", state: "lock", complete: "false" },
    ],
  },
  {
    id: 27,
    name: `Góc nội tiếp`,
    category: "Hình học đường tròn",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 28,
    name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
    category: "Hình học đường tròn",
    levels: [
      {
        name: "Đường tròn ngoại tiếp một tam giác",
        state: "unlock",
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
    category: "Hình học đường tròn",
    levels: [
      {
        name: "Đường tròn ngoại tiếp một tứ giác",
        state: "unlock",
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
    category: "Hình học không gian",
    levels: [
      { name: "Đa giác đều", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương IX", state: "lock", complete: "false" },
    ],
  },
  {
    id: 31,
    name: `Hình trụ và hình nón`,
    category: "Hình học không gian",
    levels: [
      { name: "Hình trụ", state: "unlock", complete: "false" },
      { name: "Hình nón", state: "lock", complete: "false" },
      { name: "Vận dụng", state: "lock", complete: "false" },
    ],
  },
  {
    id: 32,
    name: `Hình cầu`,
    category: "Hình học không gian",
    levels: [
      {
        name: "Diện tích mặt cầu và thể tích hình cầu",
        state: "unlock",
        complete: "false",
      },
      { name: "Vận dụng", state: "lock", complete: "false" },
      { name: "Bài tập cuối chương X", state: "lock", complete: "false" },
    ],
  },
];

console.log("Initial units from localStorage:", units);
localStorage.setItem("units", JSON.stringify(units));
console.log("Units data from localStorage:", JSON.parse(localStorage.getItem("units")));
console.log("Data from localStorage:", localStorage.getItem("units"));

function resetDatabase() {
  localStorage.removeItem("units");
  localStorage.setItem("units", JSON.stringify(units));
  window.location.href = "/math10/learn/";
}

function getUniqueCategories(units) {
  const categories = [];

  units.forEach((unit, index) => {
    const category = unit.category;
    console.log(`Unit ${index + 1} category:`, category); // Debug
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });

  return categories;
}

// function unlockFirstLevelOfEachUnit() {
//   console.log("Unlocking the first level of each unit...");
  
//   units.forEach((unit, index) => {
//     if (unit.levels && unit.levels.length > 0) {
//       unit.levels[0].state = "unlock"; // Unlock level đầu tiên
//       unit.levels[0].complete = "false"; // Không đánh dấu là complete
//       console.log(`Unit ${index + 1}: First level unlocked.`);
//     } else {
//       console.warn(`Unit ${index + 1} has no levels.`);
//     }
//   });

//   // Lưu lại thay đổi vào localStorage
//   localStorage.setItem("units", JSON.stringify(units));
//   console.log("Updated units saved to localStorage.");
// }

// Sử dụng hàm để lấy danh sách các category duy nhất
const uniqueCategories = getUniqueCategories(units);
console.log("Unique Categories:", uniqueCategories); // Debug: In ra danh sách các category

function displayUnits() {
  let html = `<h1>Chinh phục toán 9 và đề thi Toán tuyển sinh vào 10</h1>`;

  const categories = getUniqueCategories(units);
  console.log("Categories:", categories); // Debug

  categories.forEach((category) => {
    html += `
      <div class="category">
        <div class="category-header">
          <h2 class="category-title">${category}</h2>
        </div>
        <div class="category-units" style="display: none;">
    `;

    const filteredUnits = units.filter((unit) => unit.category === category);

    filteredUnits.forEach((unit) => {
      html += `
        <div class="unit">
          <div class="unit-line">
            <div class="unit-name">${unit.name}</div>
          </div>
          <div class="unit-levels">
      `;

      unit.levels.forEach((level, idx) => {
        html += `
          <div class="level">
            <div class="level-btn ${level.state}-level unit${unit.id}-level${idx + 1}"></div>
            <div class="intro-level">
              <span class="level-name">${level.name}</span>
              <a class="start-btn" href="unit/${unit.id}/level/${idx + 1}">Bắt đầu</a>
            </div>
          </div>
        `;
      });

      html += `
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

  // Thêm sự kiện click để mở/đóng category
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", (event) => {
      // Đảm bảo sự kiện chỉ áp dụng cho chính phần tử .category
      if (event.target.closest(".category-units")) {
        return; // Bỏ qua nếu click vào .category-units
      }

      const categoryUnits = category.querySelector(".category-units");
      const categoryTitle = category.querySelector(".category-title"); // Lấy tiêu đề của category
      const title = document.querySelector("h1"); // Dòng chữ cần ẩn

      if (categoryUnits) {
        const isVisible = categoryUnits.classList.contains("show");

        // Đóng tất cả các category khác
        document.querySelectorAll(".category").forEach((otherCategory) => {
          if (otherCategory !== category) {
            const otherUnits = otherCategory.querySelector(".category-units");
            const otherTitle = otherCategory.querySelector(".category-title"); // Lấy tiêu đề của category khác
            if (otherUnits && otherUnits.classList.contains("show")) {
              otherUnits.classList.remove("show");
              otherUnits.style.display = "none";
              otherCategory.classList.remove("open");
              if (otherTitle) {
                otherTitle.style.transform = "rotate(0deg)"; // Đặt lại tiêu đề về trạng thái ban đầu
              }
            }
          }
        });

        // Hiển thị hoặc ẩn category hiện tại
        if (!isVisible) {
          categoryUnits.style.display = "block";
          requestAnimationFrame(() => {
            categoryUnits.classList.add("show");
          });
          category.classList.add("open");
          if (categoryTitle) {
            categoryTitle.style.transform = "rotate(270deg)"; // Quay tiêu đề 270 độ khi mở
          }
          title.classList.add("hidden-title"); // Ẩn dòng chữ
        } else {
          categoryUnits.classList.remove("show");
          setTimeout(() => {
            categoryUnits.style.display = "none";
          }, 300);
          category.classList.remove("open");
          if (categoryTitle) {
            categoryTitle.style.transform = "rotate(0deg)"; // Đặt lại tiêu đề về trạng thái ban đầu
          }

          // Kiểm tra nếu không có category nào đang mở
          const anyVisible = document.querySelectorAll(".category-units.show").length > 0;
          if (!anyVisible) {
            title.classList.remove("hidden-title"); // Hiển thị lại dòng chữ
          }
        }
      }
    });
  });

  // Thêm sự kiện cho các nút cấp độ
  addEvent();
}

// Hàm thêm sự kiện cho các nút cấp độ
function addEvent() {
  const levelButtons = document.querySelectorAll(".level-btn.unlock-level");

  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Ẩn tất cả các intro-level
      document.querySelectorAll(".intro-level").forEach((intro) => {
        intro.classList.remove("show");
        intro.style.display = "none";
      });

      // Hiển thị intro-level tương ứng
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
              console.log('Added complete dtb: unit .unit${unitIndex + 1}-level${levelIndex + 1}')
              localStorage.setItem("units", JSON.stringify(units));
            }
          }
        }
      });
    });
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
  }
  localStorage.setItem("units", JSON.stringify(units));
  if (window.location.pathname !== "/math10/learn/") {
    window.location.href = "/math10/learn/";
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
// unlockFirstLevelOfEachUnit();
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
// addIdentity();

function resetProgress() {
  console.log("Before resetProgress:", JSON.parse(localStorage.getItem("units")));
  units.forEach((unit) => {
    unit.levels.forEach((level) => {
      level.state = "lock";
      level.complete = "false";
    });
  });
  window.location.href = "/math10/learn/";
  localStorage.setItem("units", JSON.stringify(units));
  console.log("After resetProgress:", JSON.parse(localStorage.getItem("units")));
}

function unlockAllUnits() {
  console.log("Before unlockAllUnits:", JSON.parse(localStorage.getItem("units")));
  units = [
  {
    id: 1,
    name: "Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
    category: "Phương trình và hệ phương trình",
    levels: [
      {
        name: "Phương trình bậc nhất hai ẩn",
        state: "ununlock",
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
    category: "Phương trình và hệ phương trình",
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
    category: "Phương trình và hệ phương trình",
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
    category: "Phương trình và hệ phương trình",
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
    category: "Bất đẳng thức và bất phương trình",
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
    category: "Bất đẳng thức và bất phương trình",
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
    category: "Căn thức và biến đổi căn thức",
    levels: [
      { name: "Căn bậc hai", state: "unlock", complete: "false" },
      { name: "Căn thức bậc hai", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 8,
    name: "Khai căn bậc hai với phép nhân và phép chia",
    category: "Căn thức và biến đổi căn thức",
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
    category: "Căn thức và biến đổi căn thức",
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
    category: "Căn thức và biến đổi căn thức",
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
    category: "Lượng giác",
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
    category: "Lượng giác",
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
    category: "Hình học đường tròn",
    levels: [{ name: "Đường tròn", state: "unlock", complete: "false" }],
  },
  {
    id: 14,
    name: "Cung và dây của một đường tròn",
    category: "Hình học đường tròn",
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
    category: "Hình học đường tròn",
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
    category: "Hình học đường tròn",
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
    category: "Hình học đường tròn",
    levels: [
      { name: "Vận dụng", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương V", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 18,
    name: `Hàm số y = ax² (a ≠ 0)`,
    category: "Hàm số và đồ thị",
    levels: [
      { name: "Hàm số y = ax² (a ≠ 0)", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 19,
    name: `Phương trình bậc hai một ẩn`,
    category: "Phương trình và hệ phương trình",
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
    category: "Phương trình và hệ phương trình",
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
    category: "Phương trình và hệ phương trình",
    levels: [
      { name: "Bài tập", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương VI", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 22,
    name: `Bảng tần số và biểu đồ tần số`,
    category: "Thống kê",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 23,
    name: `Bảng tần số tương đối và biểu đồ tần số tương đối`,
    category: "Thống kê",
    levels: [
      { name: "Bảng tần số tương đối", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 24,
    name: `Bảng tần số, tần số tương đối ghép nhóm và biểu đồ`,
    category: "Thống kê",
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
    category: "Xác suất",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 26,
    name: `Xác suất của biến cố có liên quan tới phép thử`,
    category: "Xác suất",
    levels: [
      { name: "Vận dụng", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương VIII", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 27,
    name: `Góc nội tiếp`,
    category: "Hình học đường tròn",
    levels: [{ name: "Vận dụng", state: "unlock", complete: "false" }],
  },
  {
    id: 28,
    name: `Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác`,
    category: "Hình học đường tròn",
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
    category: "Hình học đường tròn",
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
    category: "Hình học không gian",
    levels: [
      { name: "Đa giác đều", state: "unlock", complete: "false" },
      { name: "Bài tập cuối chương IX", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 31,
    name: `Hình trụ và hình nón`,
    category: "Hình học không gian",
    levels: [
      { name: "Hình trụ", state: "unlock", complete: "false" },
      { name: "Hình nón", state: "unlock", complete: "false" },
      { name: "Vận dụng", state: "unlock", complete: "false" },
    ],
  },
  {
    id: 32,
    name: `Hình cầu`,
    category: "Hình học không gian",
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
  window.location.href = "/math10/learn/";
  localStorage.setItem("units", JSON.stringify(units));
  console.log("After unlockAllUnits:", JSON.parse(localStorage.getItem("units")));
}

function safeSetUnits(newUnits) {
  const currentUnits = JSON.parse(localStorage.getItem("units"));
  if (JSON.stringify(currentUnits) !== JSON.stringify(newUnits)) {
    console.log("Updating units in localStorage...");
    localStorage.setItem("units", JSON.stringify(newUnits));
  } else {
    console.log("No changes detected in units. Skipping update.");
  }
  window.location.href = "/math10/learn/";
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
document.addEventListener("DOMContentLoaded", function () {
  const unitsList = document.getElementById("units-list");

  if (!unitsList) {
    console.error("Element with id 'units-list' not found in the DOM.");
    return;
  }

  units.forEach((unit) => {
    const unitItem = document.createElement("li");
    unitItem.innerHTML = `<h3>${unit.name}</h3>`;
    const levelsList = document.createElement("ul");

    unit.levels.forEach((level) => {
      const levelItem = document.createElement("li");
      levelItem.textContent = `${level.name} (${level.state})`;
      levelsList.appendChild(levelItem);
    });

    unitItem.appendChild(levelsList);
    unitsList.appendChild(unitItem);
  });
  // let lastScrollTop = 0; // Lưu vị trí cuộn trước đó
  //   const navbar = document.querySelector("nav"); // Chọn thanh điều hướng

  //   window.addEventListener("scroll", function () {
  //     const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  //     if (currentScroll > lastScrollTop) {
  //       // Cuộn xuống
  //       navbar.style.transform = "translateY(-100%)"; // Ẩn thanh điều hướng
  //     } else {
  //       // Cuộn lên
  //       navbar.style.transform = "translateY(0)"; // Hiện thanh điều hướng
  //     }

  //     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Đảm bảo giá trị không âm
  //   });

});

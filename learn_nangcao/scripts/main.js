//JSON.parse(localStorage.getItem("units_nangcao")) ||
let units_nangcao = JSON.parse(localStorage.getItem("units_nangcao")) || [
  {
    id: 1,
    name: "Các phép biến đổi cơ bản và biến đổi đa thức",
    category: "Rút gọn biểu thức",
    levels: [
      {
        name: "Các phép biến đổi cơ bản",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Biến đổi đa thức",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 2,
    name: "Rút gọn biểu thức chứa căn thức và phân thức đại số",
    category: "Rút gọn biểu thức",
    levels: [
      {
        name: "Rút gọn biểu thức chứa căn thức",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Rút gọn biểu thức chứa phân thức đại số",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 3,
    name: "Vận dụng",
    category: "Rút gọn biểu thức",
    levels: [
      {
        name: "Vận dụng",
        state: "unlock",
        complete: "false",
      },
    ],
  },
  {
    id: 4,
    name: "Phương trình, Hệ phương trình bậc nhất 1 ẩn",
    category: "Giải phương trình, hệ phương trình bậc nhất, bậc hai",
    levels: [
      {
        name: "Phương trình bậc nhất 1 ẩn",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Hệ phương trình bậc nhất 1 ẩn",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 5,
    name: "Phương trình, Hệ phương trình bậc nhất 2 ẩn",
    category: "Giải phương trình, hệ phương trình bậc nhất, bậc hai",
    levels: [
      {
        name: "Phương trình bậc nhất 2 ẩn",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Hệ phương trình bậc nhất hỗn hợp",
        state: "lock",
        complete: "false",
      },
      {
        name: "Giải bằng phương pháp thế, cộng đại số",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 6,
    name: "Các cách chứng minh",
    category: "Chứng minh biểu thức có giá trị nguyên",
    levels: [
      {
        name: "Chứng minh bằng phép chia hết",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Chứng minh bằng phép quy nạp hoặc tính chất đặc biệt",
        state: "lock",
        complete: "false",
      },
    ],
  },
  {
    id: 7,
    name: "Lập phương trình, hệ phương trình",
    category: "Giải bài toán bằng cách lập phương trình",
    levels: [
      {
        name: "Dạng lãi kép, lãi suất, giảm giá kép",
        state: "unlock",
        complete: "false",
      },
      {
        name: "Dạng vòi nước, năng suất, công việc",
        state: "lock",
        complete: "false",
      },
      {
        name: "Dạng thời gian, quãng đường, vận tốc",
        state: "lock",
        complete: "false",
      },
      {
        name: "Dạng nước chảy xuôi, nước chảy ngược",
        state: "lock",
        complete: "false",
      },
    ],
  },
];

console.log("Initial units_nangcao from localStorage:", units_nangcao);
localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
console.log("Units data from localStorage:", JSON.parse(localStorage.getItem("units_nangcao")));

function resetDatabase() {
  localStorage.removeItem("units_nangcao");
  // Reload units from localStorage or use default if not present
  let newUnits = JSON.parse(localStorage.getItem("units_nangcao")) || units;
  localStorage.setItem("units_nangcao", JSON.stringify(newUnits));
  // Re-render the UI if needed
  if (typeof displayUnits === "function") {
    displayUnits();
  }
  window.location.href = "../learn_nangcao/";
}

function getUniqueCategories(units_nangcao) {
  const categories = [];

  units_nangcao.forEach((unit, index) => {
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
  
//   units_nangcao.forEach((unit, index) => {
//     if (unit.levels && unit.levels.length > 0) {
//       unit.levels[0].state = "unlock"; // Unlock level đầu tiên
//       unit.levels[0].complete = "false"; // Không đánh dấu là complete
//       console.log(`Unit ${index + 1}: First level unlocked.`);
//     } else {
//       console.warn(`Unit ${index + 1} has no levels.`);
//     }
//   });

//   // Lưu lại thay đổi vào localStorage
//   localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
//   console.log("Updated units_nangcao saved to localStorage.");
// }

// Sử dụng hàm để lấy danh sách các category duy nhất
const uniqueCategories = getUniqueCategories(units_nangcao);
console.log("Unique Categories:", uniqueCategories); // Debug: In ra danh sách các category

function displayUnits() {
  let html = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h1 style="margin: 0; font-size: 2.5rem;">Thời điểm nước rút ôn thi vào 10.</h1>
      <a href="../learn/"
         class="btn-chung"
         style="
            margin-left: 16px;
            padding: 12px 28px;
            background: linear-gradient(90deg,rgb(0, 255, 170),rgb(0, 191, 255));
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(17, 0, 255, 0.4);
            font-weight: bold;
            transition: transform 0.3s, box-shadow 0.3s;
            text-decoration: none;
            color: #fff;
            font-size: 1.35rem;
            letter-spacing: 0.5px;
         "
         onmouseover="this.style.transform='scale(1.07)';this.style.boxShadow='0 8px 20px rgba(255,193,7,0.5)';"
         onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 12px rgba(255,193,7,0.4)';"
      >
        <span style="font-size: 1.35rem; font-weight: bold;">Chung</span>
      </a>
    </div>
  `;

  const categories = getUniqueCategories(units_nangcao);
  console.log("Categories:", categories); // Debug

  categories.forEach((category) => {
    html += `
      <div class="category">
        <div class="category-header">
          <h2 class="category-title">${category}</h2>
        </div>
        <div class="category-units" style="display: none;">
    `;

    const filteredUnits = units_nangcao.filter((unit) => unit.category === category);

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
      const nut_chung = document.getElementsByClassName("btn-chung"); // Dòng chữ cần ẩn

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
          Array.from(nut_chung).forEach(el => el.classList.add("hidden-title")); // Ẩn dòng chữ
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
            Array.from(nut_chung).forEach(el => el.classList.remove("hidden-title")); // Ẩn dòng chữ
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

  units_nangcao.forEach((unit, unitIndex) => {
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
              units_nangcao[unitIndex].levels[levelIndex].complete = "true";
              console.log(
              `Added 'complete' class to .unit${unitIndex + 1}-level${
                levelIndex + 1
              }`
            );
              localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
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
    units_nangcao[adjustedUnitIndex] &&
    units_nangcao[adjustedUnitIndex].levels[adjustedLevelIndex]
  ) {
    units_nangcao[adjustedUnitIndex].levels[adjustedLevelIndex].state =
      state === 1 ? "unlock" : "lock";
    units_nangcao[adjustedUnitIndex].levels[adjustedLevelIndex].complete =
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
    localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
    console.log(
      `Unit ${unitIndex}, Level ${levelIndex} updated: state=${cur_state}, complete=${cur_complete}`
    );
  } else {
    console.error(
      `Invalid unitIndex (${unitIndex}) or levelIndex (${levelIndex})`
    );
  }
  }
  localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
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
  console.log("Before resetProgress:", JSON.parse(localStorage.getItem("units_nangcao")));
  units.forEach((unit) => {
    unit.levels.forEach((level) => {
      level.state = "lock";
      level.complete = "false";
    });
    // Unlock the first level of each unit
    if (unit.levels.length > 0) {
      unit.levels[0].state = "unlock";
    }
  });
  window.location.href = "../learn_nangcao/";
  localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
  console.log("After resetProgress:", JSON.parse(localStorage.getItem("units_nangcao")));
}

function unlockAllUnits() {
  const units_nangcao = JSON.parse(localStorage.getItem("units_nangcao") || "[]");

  units_nangcao.forEach(unit => {
    unit.levels.forEach(level => {
      level.state = "unlock";
      level.complete = "false";
    });
  });

  localStorage.setItem("units_nangcao", JSON.stringify(units_nangcao));
  window.location.href = "../learn_nangcao/";
}


function safeSetUnits(newUnits) {
  const currentUnits = JSON.parse(localStorage.getItem("units_nangcao"));
  if (JSON.stringify(currentUnits) !== JSON.stringify(newUnits)) {
    console.log("Updating units_nangcao in localStorage...");
    localStorage.setItem("units_nangcao", JSON.stringify(newUnits));
  } else {
    console.log("No changes detected in units_nangcao. Skipping update.");
  }
  window.location.href = "../learn_nangcao/";
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
function showWarningModalAgain() {
  localStorage.removeItem("hideWarningModal");
  const modal = document.getElementById("alert-modal");
  if (modal) modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const units_nangcaoList = document.getElementById("units_nangcao-list");
    const modal = document.getElementById("alert-modal");
    const okBtn = document.getElementById("ok-btn");
    const dontShowAgainBtn = document.getElementById("dont-show-again-btn");

    // Kiểm tra localStorage
    if (localStorage.getItem("hideWarningModal") === "true") {
      modal.style.display = "none";
    }

    okBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    dontShowAgainBtn.addEventListener("click", () => {
      localStorage.setItem("hideWarningModal", "true");
      modal.style.display = "none";
    });


  if (!units_nangcaoList) {
    console.warning("Element with id 'units_nangcao-list' not found in the DOM.");
    return;
  }

  units_nangcao.forEach((unit) => {
    const unitItem = document.createElement("li");
    unitItem.innerHTML = `<h3>${unit.name}</h3>`;
    const levelsList = document.createElement("ul");

    unit.levels.forEach((level) => {
      const levelItem = document.createElement("li");
      levelItem.innerHTML = `${level.name} (${level.state})`;
      levelsList.appendChild(levelItem);
    });

    unitItem.appendChild(levelsList);
    units_nangcaoList.appendChild(unitItem);
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

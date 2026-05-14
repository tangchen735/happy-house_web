// calendar.js - 日历组件核心逻辑
function initCalendar() {
  // 1. 获取DOM元素
  const calendarTitle = document.getElementById("calendarTitle");
  const calendarDays = document.getElementById("calendarDays");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  // 校验元素是否存在
  if (!calendarTitle || !calendarDays || !prevMonthBtn || !nextMonthBtn) {
    console.warn("日历DOM元素未找到，请检查ID是否正确");
    return;
  }

  // 2. 初始化日期变量
  let currentDate = new Date();

  // 3. 渲染日历核心函数
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 更新年月标题
    calendarTitle.textContent = `${year}年${month + 1}月`;
    calendarDays.innerHTML = ""; // 清空日期格子

    // 获取当月第一天星期数、当月总天数
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 添加上月空白格子
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.style = `
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #e0e0e0;
        border-radius: 6px;
        padding: 8px 0;
      `;
      calendarDays.appendChild(emptyDiv);
    }

    // 添加当月日期格子
    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement("div");
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      // 日期格子样式
      dayDiv.style = `
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: ${isToday ? "#fff" : "#2d3748"};
        background-color: ${isToday ? "#e64c65" : "transparent"};
        border-radius: 6px;
        padding: 8px 0;
        cursor: pointer;
        transition: background-color 0.2s ease;
      `;

      // 悬浮效果
      dayDiv.onmouseover = function () {
        if (!isToday) this.style.backgroundColor = "#f1f5f9";
      };
      dayDiv.onmouseout = function () {
        if (!isToday) this.style.backgroundColor = "transparent";
      };

      dayDiv.textContent = day;
      calendarDays.appendChild(dayDiv);
    }
  }

  // 4. 绑定月份切换事件
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // 5. 初始化渲染
  renderCalendar();
}

// 页面加载完成后自动初始化（可选）
window.onload = function () {
  initCalendar();
};

// 1. 实时更新当前时间
function updateTime() {
  const now = new Date();
  const timeEl = document.getElementById("currentTime");
  const dateEl = document.getElementById("currentDate");

  // 格式化时间
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  timeEl.textContent = `${h}:${m}:${s}`;

  // 格式化日期
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const week = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  dateEl.textContent = `${year}年${month}月${day}日 星期${week}`;
}

// 2. 日历逻辑（和之前保持一致，适配新样式）
var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];

var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");

var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();

function dayStart(month, year) {
  var tmpDate = new Date(year, month, 1);
  return tmpDate.getDay() === 0 ? 7 : tmpDate.getDay();
}

function daysMonth(month, year) {
  var tmp = year % 4;
  if (tmp == 0 && (year % 100 != 0 || year % 400 == 0)) {
    return month_olympic[month];
  } else {
    return month_normal[month];
  }
}

function refreshDate() {
  var str = "";
  var totalDay = daysMonth(my_month, my_year);
  var firstDay = dayStart(my_month, my_year);
  var myclass;

  for (var i = 1; i < firstDay; i++) {
    str += "<li></li>";
  }

  for (var i = 1; i <= totalDay; i++) {
    if (
      (i < my_day &&
        my_year == my_date.getFullYear() &&
        my_month == my_date.getMonth()) ||
      my_year < my_date.getFullYear() ||
      (my_year == my_date.getFullYear() && my_month < my_date.getMonth())
    ) {
      myclass = " class='lightgrey'";
    } else if (
      i == my_day &&
      my_year == my_date.getFullYear() &&
      my_month == my_date.getMonth()
    ) {
      myclass = " class='green greenbox'";
    } else {
      myclass = " class='darkgrey'";
    }
    str += "<li" + myclass + ">" + i + "</li>";
  }
  holder.innerHTML = str;
  ctitle.innerHTML = month_name[my_month];
  cyear.innerHTML = my_year;
}

// 3. 初始化（页面加载后执行）
window.onload = function () {
  // 启动时间更新（每秒刷新）
  updateTime();
  setInterval(updateTime, 1000);

  // 渲染日历
  refreshDate();

  // 绑定日历切换事件
  prev.onclick = function (e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
      my_year--;
      my_month = 11;
    }
    refreshDate();
  };
  next.onclick = function (e) {
    e.preventDefault();
    my_month++;
    if (my_month > 11) {
      my_year++;
      my_month = 0;
    }
    refreshDate();
  };
};

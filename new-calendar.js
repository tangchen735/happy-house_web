// new-calendar.js - 日历核心逻辑
window.onload = function () {
  // 定义变量
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

  // 获取DOM元素
  var holder = document.getElementById("days");
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var ctitle = document.getElementById("calendar-title");
  var cyear = document.getElementById("calendar-year");

  // 获取当前日期
  var my_date = new Date();
  var my_year = my_date.getFullYear();
  var my_month = my_date.getMonth();
  var my_day = my_date.getDate();

  // 获取某年某月第一天是星期几
  function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return tmpDate.getDay() === 0 ? 7 : tmpDate.getDay(); // 修正周日为7，适配MON开头
  }

  // 获取某月总天数
  function daysMonth(month, year) {
    var tmp = year % 4;
    if (tmp == 0 && (year % 100 != 0 || year % 400 == 0)) {
      // 完善闰年判断
      return month_olympic[month];
    } else {
      return month_normal[month];
    }
  }

  // 刷新日历
  function refreshDate() {
    var str = "";
    var totalDay = daysMonth(my_month, my_year); // 获取该月总天数
    var firstDay = dayStart(my_month, my_year); // 获取该月第一天是星期几
    var myclass;

    // 生成前置空白
    for (var i = 1; i < firstDay; i++) {
      str += "<li></li>";
    }

    // 生成日期
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

  // 初始化
  refreshDate();

  // 上月切换
  prev.onclick = function (e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
      my_year--;
      my_month = 11;
    }
    refreshDate();
  };

  // 下月切换
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

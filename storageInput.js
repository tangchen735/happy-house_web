// storageInput.js - 专门处理输入框本地存储的逻辑
function initStorageInput(inputId, defaultValue = "123") {
  // 获取输入框元素
  const input = document.getElementById(inputId);
  if (!input) {
    console.warn(`未找到ID为${inputId}的输入框`);
    return;
  }

  // 页面加载时读取本地存储
  const savedValue = localStorage.getItem("inputValue");
  input.value = savedValue || defaultValue;

  // 输入内容变化时自动保存
  input.addEventListener("input", function () {
    localStorage.setItem("inputValue", this.value);
  });
}

// 可选：如果想支持sessionStorage（关闭页面就清空），新增这个函数
function initSessionInput(inputId, defaultValue = "123") {
  const input = document.getElementById(inputId);
  if (!input) return;

  const savedValue = sessionStorage.getItem("inputValue");
  input.value = savedValue || defaultValue;

  input.addEventListener("input", function () {
    sessionStorage.setItem("inputValue", this.value);
  });
}

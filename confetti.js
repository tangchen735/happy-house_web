// confetti.js - 五彩纸屑独立JS文件
class Confetti {
  // 颜色数组
  static colors = [
    "#ff0a54", "#ff477e", "#ff85a1",
    "#00f5d4", "#9b5de5",
    "#fee440", "#00bbf9"
  ];

  // 初始化：创建容器 + 自动生成纸屑
  constructor(options = {}) {
    // 默认配置
    this.config = {
      interval: 90, // 每隔90ms创建一个纸屑
      duration: Infinity, // 持续时间（Infinity=无限循环）
      container: document.body // 挂载容器
    };
    // 合并自定义配置
    Object.assign(this.config, options);

    // 创建纸屑容器（避免污染body）
    this.confettiContainer = document.createElement("div");
    this.confettiContainer.className = "confetti-container";
    this.config.container.appendChild(this.confettiContainer);

    // 启动纸屑生成
    this.start();
  }

  // 创建单个纸屑
  createPiece() {
    // 创建外层容器
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // 创建3D块
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    // 创建正反两面
    const front = document.createElement("div");
    const back = document.createElement("div");
    front.className = "confetti-side";
    back.className = "confetti-side confetti-back";

    // 随机颜色
    const color = Confetti.colors[Math.floor(Math.random() * Confetti.colors.length)];
    front.style.background = color;
    back.style.background = color;

    // 组装
    piece.appendChild(front);
    piece.appendChild(back);
    confetti.appendChild(piece);

    // 随机位置（基于容器宽度）
    confetti.style.left = `${Math.random() * 100}%`;

    // 随机动画时长
    const fallDuration = Math.random() * 4 + 4;
    const spinDuration = Math.random() * 3 + 2;
    confetti.style.animationDuration = `${fallDuration}s`;
    piece.style.animationDuration = `${spinDuration}s`;

    // 添加到容器
    this.confettiContainer.appendChild(confetti);

    // 动画结束后移除，避免内存泄漏
    setTimeout(() => {
      confetti.remove();
    }, fallDuration * 1000);
  }

  // 启动生成纸屑
  start() {
    this.intervalId = setInterval(() => {
      this.createPiece();
    }, this.config.interval);

    // 如果设置了持续时间，到时停止
    if (this.config.duration !== Infinity) {
      setTimeout(() => {
        this.stop();
      }, this.config.duration);
    }
  }

  // 停止生成纸屑
  stop() {
    clearInterval(this.intervalId);
  }

  // 销毁所有纸屑
  destroy() {
    this.stop();
    this.confettiContainer.remove();
  }
}

// 页面加载完成后自动启动（无需绑定任何事件）
window.addEventListener("load", () => {
  // 初始化五彩纸屑（无限循环）
  new Confetti({
    interval: 90, // 生成频率（越小越密集）
    duration: Infinity, // 无限循环（改为3000则只运行3秒）
    container: document.body // 挂载到body
  });
});
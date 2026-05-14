// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 1. 导航切换逻辑
  const navButtons = document.querySelectorAll(".title-nav button");
  const stages = document.querySelectorAll(".stage");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 移除所有active类
      navButtons.forEach((btn) => btn.classList.remove("active"));
      stages.forEach((stage) => stage.classList.remove("active"));

      // 添加当前active类
      this.classList.add("active");
      const targetStage = document.getElementById(this.dataset.stage);
      targetStage.classList.add("active");
    });
  });

  // 2. 磁吸效果逻辑
  const magneticWrap = document.getElementById("magnetic");
  if (magneticWrap) {
    const magneticLetters = magneticWrap.querySelectorAll("span");

    magneticWrap.addEventListener("mousemove", function (e) {
      const wrapRect = magneticWrap.getBoundingClientRect();
      const centerX = wrapRect.left + wrapRect.width / 2;
      const centerY = wrapRect.top + wrapRect.height / 2;

      magneticLetters.forEach((letter, index) => {
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2;
        const letterCenterY = letterRect.top + letterRect.height / 2;

        // 计算偏移量
        const dx = (e.clientX - centerX) / 15;
        const dy = (e.clientY - centerY) / 15;

        // 反向偏移（磁吸排斥）
        letter.style.transform = `translate(${-dx}px, ${-dy}px)`;
      });
    });

    magneticWrap.addEventListener("mouseleave", function () {
      magneticLetters.forEach((letter) => {
        letter.style.transform = "translate(0, 0)";
      });
    });
  }

  // 3. 波浪效果逻辑
  const waveWrap = document.getElementById("wave");
  if (waveWrap) {
    const waveLetters = waveWrap.querySelectorAll("span");

    waveWrap.addEventListener("click", function () {
      waveLetters.forEach((letter, index) => {
        // 重置样式
        letter.style.transform = "translateY(0)";
        letter.style.opacity = "1";

        // 波浪动画
        setTimeout(() => {
          letter.style.transition = "all 0.3s ease";
          letter.style.transform = "translateY(-10px)";
          letter.style.opacity = "0.5";

          setTimeout(() => {
            letter.style.transform = "translateY(0)";
            letter.style.opacity = "1";
          }, 300);
        }, index * 100);
      });
    });
  }

  // 4. 粒子效果逻辑
  const particleCanvas = document.getElementById("particle-canvas");
  const particleText = document.getElementById("particle-text");
  if (particleCanvas && particleText) {
    const ctx = particleCanvas.getContext("2d");

    // 设置canvas尺寸
    function resizeCanvas() {
      particleCanvas.width = particleText.offsetWidth + 100;
      particleCanvas.height = particleText.offsetHeight + 100;
      particleCanvas.style.left = `-${particleCanvas.width / 2 - particleText.offsetWidth / 2}px`;
      particleCanvas.style.top = `-${particleCanvas.height / 2 - particleText.offsetHeight / 2}px`;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 粒子数组
    let particles = [];

    // 创建粒子
    function createParticles(x, y) {
      particles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: x,
          y: y,
          size: Math.random() * 5 + 2,
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
          speedX: (Math.random() - 0.5) * 6,
          speedY: (Math.random() - 0.5) * 6,
          gravity: 0.1,
          life: 100,
          maxLife: 100,
        });
      }
    }

    // 绘制粒子
    function drawParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // 更新粒子位置
        p.speedY += p.gravity;
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fill();
        ctx.globalAlpha = 1;

        // 移除死亡粒子
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        requestAnimationFrame(drawParticles);
      }
    }

    // 点击文字创建粒子
    particleText.addEventListener("click", function (e) {
      const rect = particleText.getBoundingClientRect();
      const canvasRect = particleCanvas.getBoundingClientRect();

      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      createParticles(x, y);
      drawParticles();
    });
  }

  // 5. 3D翻转效果 - 点击切换大小写
  const flipWrap = document.querySelector(".flip-wrap");
  if (flipWrap) {
    const flipLetters = flipWrap.querySelectorAll("span");

    flipWrap.addEventListener("click", function (e) {
      if (e.target.tagName === "SPAN" && e.target.textContent.trim() !== "") {
        const text = e.target.textContent;
        e.target.textContent =
          text === text.toUpperCase() ? text.toLowerCase() : text.toUpperCase();
      }
    });
  }

  // 6. 打字机效果逻辑
  const typeText = document.getElementById("type-text");
  const btnType = document.getElementById("btn-type");
  const btnErase = document.getElementById("btn-erase");
  const btnLoop = document.getElementById("btn-loop");

  if (typeText && btnType && btnErase && btnLoop) {
    const fullText = "Dream Big";
    let currentText = "";
    let isLooping = false;
    let loopInterval;

    // 打字效果
    function type() {
      if (currentText.length < fullText.length) {
        currentText = fullText.substring(0, currentText.length + 1);
        typeText.textContent = currentText;
        setTimeout(type, 200);
      }
    }

    // 删除效果
    function erase() {
      if (currentText.length > 0) {
        currentText = currentText.substring(0, currentText.length - 1);
        typeText.textContent = currentText;
        setTimeout(erase, 100);
      }
    }

    // 循环效果
    function toggleLoop() {
      if (isLooping) {
        clearInterval(loopInterval);
        isLooping = false;
        btnLoop.textContent = "Loop";
      } else {
        isLooping = true;
        btnLoop.textContent = "Stop";

        loopInterval = setInterval(() => {
          if (currentText === fullText) {
            erase();
          } else {
            type();
          }
        }, 2000);
      }
    }

    // 绑定按钮事件
    btnType.addEventListener("click", function () {
      if (isLooping) toggleLoop();
      type();
    });

    btnErase.addEventListener("click", function () {
      if (isLooping) toggleLoop();
      erase();
    });

    btnLoop.addEventListener("click", toggleLoop);
  }
});

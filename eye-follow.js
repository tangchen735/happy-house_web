// eye-follow.js - 眼睛跟随鼠标交互逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 初始化高光点基础位置
  document.querySelectorAll(".highlight").forEach((highlight) => {
    if (!highlight.dataset.baseCx) {
      highlight.dataset.baseCx = highlight.getAttribute("cx") || "";
      highlight.dataset.baseCy = highlight.getAttribute("cy") || "";
    }
  });

  // 鼠标移动事件监听
  document.addEventListener("mousemove", (e) => {
    const eyes = document.querySelectorAll(".eye-group");

    eyes.forEach((eye) => {
      const cx = parseFloat(eye.getAttribute("data-cx"));
      const cy = parseFloat(eye.getAttribute("data-cy"));
      const maxRadius = parseFloat(eye.getAttribute("data-r"));

      // 获取眼睛相对于视口的位置
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // 计算角度和距离
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius * 3);
      const moveDistance = (distance / (maxRadius * 3)) * maxRadius;

      const newX = cx + Math.cos(angle) * moveDistance;
      const newY = cy + Math.sin(angle) * moveDistance;

      // 更新瞳孔位置
      const pupil = eye.querySelector(".pupil");
      if (pupil) {
        if (pupil.tagName === "ellipse" || pupil.tagName === "circle") {
          pupil.setAttribute("cx", newX);
          pupil.setAttribute("cy", newY);
        } else if (pupil.tagName === "path") {
          const dx_move = newX - cx;
          const dy_move = newY - cy;
          pupil.style.transform = `translate(${dx_move}px, ${dy_move}px)`;
          pupil.style.transformOrigin = `${cx}px ${cy}px`;
        }
      }

      // 移动高光点（深度效果）
      const highlight = eye.querySelector(".highlight");
      if (highlight && highlight.dataset.baseCx) {
        const baseCx = parseFloat(highlight.dataset.baseCx);
        const baseCy = parseFloat(highlight.dataset.baseCy);
        const offsetX = (newX - cx) * 0.5;
        const offsetY = (newY - cy) * 0.5;

        highlight.setAttribute("cx", baseCx + offsetX);
        highlight.setAttribute("cy", baseCy + offsetY);
      }
    });
  });
});
// 2D猫咪宠物切换逻辑
document.addEventListener("DOMContentLoaded", function () {
  const catPet = document.getElementById("cat-pet");
  const staticCat = "cat.gif"; // 静态猫咪
  const animateCat = "cat-animate.gif"; // 动态猫咪
  let isAnimate = false;

  catPet.addEventListener("click", function () {
    isAnimate = !isAnimate;
    catPet.src = isAnimate ? animateCat : staticCat;
    // 点击缩放动画
    catPet.style.transform = "scale(1.1)";
    setTimeout(() => {
      catPet.style.transform = "scale(1)";
    }, 200);
  });
});

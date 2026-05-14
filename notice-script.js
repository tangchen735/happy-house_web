// 公告数据（在这里增删改公告内容）
const noticeData = [
  {
    id: 1,
    title: "网站上线公告：冯明娟的快乐小屋正式启用啦🎉",
    time: "2026-03-13",
    desc: "各位朋友，大家好！经过一段时间的筹备，我的个人网站「冯明娟的快乐小屋」今天正式上线啦！这里会分享小说、动漫、视频和音乐相关内容，后续还会不断更新更多有趣的内容，欢迎常来看看~",
    content: `各位朋友，大家好！
<br><br>
经过一段时间的筹备，我的个人网站「冯明娟的快乐小屋」今天正式上线啦！
<br><br>
✨ 网站主要内容：
- 小说推荐与分享（言情、治愈、悬疑等类型）
- 动漫盘点（治愈系、热血系、日常系）
- 趣味视频合集
- 好听的音乐推荐
<br><br>
后续还会不断更新更多有趣的内容，欢迎常来看看，也欢迎大家留言分享自己喜欢的内容~
<br><br>
冯明娟
2026年3月13日`,
  },
  {
    id: 2,
    title: "本周更新：新增5部治愈系动漫推荐",
    time: "2026-03-10",
    desc: "本周给大家整理了5部超治愈的动漫，涵盖温馨日常、成长治愈等类型，适合放松心情时观看，全部已更新到动漫板块，快去看看吧～",
    content: `本周更新啦！给大家整理了5部超治愈的动漫：
<br><br>
1. 《夏目友人帐》- 温柔治愈，关于陪伴与成长
2. 《龙猫》- 宫崎骏经典，童年的美好与温暖
3. 《白兔糖》- 日常温馨，治愈人心的亲情故事
4. 《元气食堂》- 轻松搞笑，解压必备
5. 《玉子市场》- 小镇日常，简单又美好
<br><br>
全部已更新到动漫板块，快去看看吧～
<br><br>
温馨提示：适合在放松心情、感到疲惫时观看哦！`,
  },
  // 新增公告示例（复制下面这段修改内容即可）
  // {
  //   id: 3,
  //   title: "你的公告标题",
  //   time: "发布时间",
  //   desc: "公告简短摘要（列表页显示）",
  //   content: "公告完整内容（详情页显示，支持<br>换行）"
  // },
];

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  const noticeList = document.getElementById("noticeList");
  const noticeModal = document.getElementById("noticeModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalTime = document.getElementById("modalTime");
  const modalContent = document.getElementById("modalContent");

  // 渲染公告列表
  function renderNoticeList() {
    // 清空列表
    noticeList.innerHTML = "";

    // 无公告时显示空状态
    if (noticeData.length === 0) {
      noticeList.innerHTML = '<div class="notice-empty">暂无公告</div>';
      return;
    }

    // 遍历生成公告卡片
    noticeData.forEach((notice) => {
      const card = document.createElement("div");
      card.className = "notice-card baise yinying mgt8";
      card.dataset.id = notice.id;
      card.innerHTML = `
        <div class="notice-header">
          <h3 class="notice-title">${notice.title}</h3>
          <span class="notice-time">${notice.time}</span>
        </div>
        <p class="notice-desc">${notice.desc}</p>
      `;

      // 点击卡片打开详情
      card.addEventListener("click", () => openNoticeDetail(notice.id));
      noticeList.appendChild(card);
    });
  }

  // 打开公告详情
  function openNoticeDetail(noticeId) {
    const notice = noticeData.find((item) => item.id === noticeId);
    if (notice) {
      modalTitle.textContent = notice.title;
      modalTime.textContent = notice.time;
      modalContent.innerHTML = notice.content;
      noticeModal.classList.add("show");
      // 禁止页面滚动
      document.body.style.overflow = "hidden";
    }
  }

  // 关闭弹窗
  function closeModal() {
    noticeModal.classList.remove("show");
    // 恢复页面滚动
    document.body.style.overflow = "";
  }

  // 绑定关闭事件
  modalClose.addEventListener("click", closeModal);
  // 点击遮罩层关闭弹窗
  noticeModal.addEventListener("click", (e) => {
    if (e.target === noticeModal) closeModal();
  });

  // 初始化渲染列表
  renderNoticeList();
});

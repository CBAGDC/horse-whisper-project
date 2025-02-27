<template>
  <div class="container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <ul>
        <li class="c"><router-link to="/zMaHorses">我的个人故事</router-link></li>
        <li class="c"><router-link to="/zRatStories">骑手和他们的故事</router-link></li>
        <li class="c"><router-link to="/zAEquestrian">关于马术</router-link></li>
        <li class="c"><router-link to="/zAHorses">关于马</router-link></li>
        <li class="icon-item" @click="handleTranslateClick">
          <img src="../assets/icons/翻译.svg" alt="翻译图标">
        </li>
        <li class="icon-item" @click="handleBrightnessClick">
          <img src="../assets/icons/亮度.svg" alt="亮度图标">
        </li>
        <li class="icon-item" @click="navigateToLogin">
          <img src="../assets/icons/注册登录.svg" alt="注册登录图标">
        </li>
      </ul>
    </nav>
    
    <!-- 背景色 -->
    <div class="left-section"></div>
    <div class="right-section"></div>
    <!-- 主标题和副标题 -->
    <div class="main-header">
      <p>马语</p><p>者</p><br />
      <p>嘉良的个人</p>&nbsp;&nbsp;<p>网页</p>
    </div>

    <!-- 作者介绍 -->
    <div class="text-content">
      <p>李嘉良</p>
      <p>鲜衣怒马少年时，不识愁滋味，</p>
      <p>分享每日学习、生活和马术知识。</p>
    </div>

    <!-- 图片部分 -->
    <section class="image-section">
      <div class="Masking-Layer">
        <img src="../assets/image/Rectangle 14.png" alt="Masking Layer">
      </div>
      <div class="image-rider">
        <img src="../assets/image/rider.png" alt="Rider">
      </div>
      <div class="Green-Screen">
        <img src="../assets/image/Rectangle 10.png" alt="Green Screen">
      </div>
      <div class="bottom-right-image">
        <img src="../assets/image/horse.png" alt="Horse">
      </div>
    </section>

    <!-- 统计数据 -->
    <footer class="stats-footer">
      <div>
        <span>{{ formattedTotalArticleCount }}</span>
        <p>文章</p>
      </div>
      <div>
        <span>{{ formattedTotalPvCount }}</span>
        <p>浏览</p>
      </div>
      <div>
        <span>365天</span>
        <p>运行时间</p>
      </div>
    </footer>

    <!-- 下一页 -->
    <div class="next-page">
      <router-link to="/Home" aria-label="下一页" @click="handleNextPageClick">
        <img src="../assets/image/下一页.png" alt="下一页">
        <p>下一页</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useThemeStore } from '@/stores/theme';

export default {
  name: 'zHeader',
  setup() {
    const themeStore = useThemeStore();
    return { themeStore };
  },
  data() {
    return {
      totalArticleCount: 0,
      totalPvCount: 0,
      isTranslated: false,
    };
  },
  computed: {
    formattedTotalArticleCount() {
      return this.formatNumber(this.totalArticleCount);
    },
    formattedTotalPvCount() {
      return this.formatNumber(this.totalPvCount);
    },
    brightnessText() {
      return this.themeStore.isBright ? 'Dark Mode' : 'Light Mode';
    },
  },
  methods: {
    async fetchArticleStats() {
      try {
        const response = await axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list');
        if (response.data.code === '00000') {
          this.totalArticleCount = response.data.data.total;
        }
      } catch (error) {
        console.error('Error fetching article stats:', error);
      }
    },
    async fetchVisitStats() {
      try {
        const response = await axios.get('http://cwebcrm.cn:8046/api/v1/logs/visit-stats');
        if (response.data.code === '00000') {
          this.totalPvCount = response.data.data.totalPvCount;
        }
      } catch (error) {
        console.error('Error fetching visit stats:', error);
      }
    },
    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    },
    handleNextPageClick() {
      this.$router.push('/Home');
    },
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        this.handleNextPageClick();
      }
    },
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
      if (this.$i18n.locale === 'zh') {
        this.$router.push({ name: 'zHeader' }); // 假设中文版本的Header页面路由名称为 'HeaderZh'
      } else {
        this.$router.push({ name: 'Header' }); // 英文版本的Header页面路由名称为 'Header'
      }
    },
    handleBrightnessClick() {
      try {
        this.themeStore.toggleDarkMode(); // 确保调用的是 toggleDarkMode 方法
        this.updateBrightness();
      } catch (error) {
        console.error('Error toggling brightness:', error);
      }
    },
    updateLanguage() {
      const newLocale = this.isTranslated ? 'zh' : 'en';
      this.$i18n.locale = newLocale;
      console.log(`Language switched to ${newLocale}`);
    },
    updateBrightness() {
      document.body.classList.toggle('dark-mode', !this.themeStore.isBright);
      console.log(`Brightness switched to ${this.themeStore.isBright ? 'Dark' : 'Light'}`);
    },
  },
  mounted() {
    this.fetchArticleStats();
    this.fetchVisitStats();
    window.addEventListener('keydown', this.handleKeyDown);
    this.$i18n.locale = 'en'; // 默认语言
    document.body.classList.toggle('dark-mode', !this.themeStore.isBright);
    this.themeStore.initializeTheme(); // 初始化主题
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>



<style>
body.dark-mode {
  background-color: #333;
  color: #fff;
}
/* App.vue 或全局样式文件 */
body.dark-mode {
  background-color: #333;
  color: #fff;
}

body.dark-mode .left-section {
  background-color: #111111;
}

body.dark-mode .navbar ul li a {
  color: #fff;
}

body.dark-mode .main-header p:nth-child(1) {
  color: #fff;
}

body.dark-mode .main-header p:nth-child(4) {
  color: #ffffff;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .main-header p {
    font-size: 1rem;
  }
  .image-section img {
    width: 100%;
  }
}
* {
		margin: 0;
		padding: 0;
}

li {
		list-style: none;
}

/* 引入得意黑字体 */
@font-face {
    font-family: 'DeYiHei';
    src: url('../assets/fonts/SmileySans-Oblique.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Inter';
    src: url('../assets/fonts/Inter-Medium.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'SiYuanHeiTiB';
    src: url('../assets/fonts/SourceHanSansSC-Bold.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SiYuanHeiTiR';
    src: url('../assets/fonts/SourceHanSansSC-Regular.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
}

/* 整体容器样式，设置宽度等基本属性，并让内部元素可以横向排列 */
.container {
  position: relative;
  width: 100%;
  min-height: 100vh; /* 确保容器高度至少撑满视口高度 */
  overflow: hidden;
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: row; /* 水平排列 */
}

/* 左边白色区域样式 */
.left-section {
    z-index: 0;
    flex: 0 40%; /* 设置固定宽度为40% */
    background-color: white;
    padding: 200px; /* 适当调整内边距，避免影响图片布局，可按需微调 */
    background: rgba(238, 238, 238, 1);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
}

/* 右边黑色区域样式 */
.right-section {
    z-index: 0;
    flex: 0 60%; /* 设置固定宽度为60% */
    background-color: #111111;
    padding: 250px;
    position: relative; /* 为了给内部导航栏提供相对定位的基准，添加此属性 */
    display: flex; /* 使用flex布局来垂直排列主标题、副标题和作者介绍 */
    flex-direction: column; /* 设置flex方向为垂直 */
    align-items: flex-start; /* 左对齐内容 */
    justify-content: center; /* 垂直居中内容 */
    padding: 250px 250px 250px 100px; /* 调整内边距，确保内容不会紧贴边缘 */
}


/* 媒体查询，针对不同屏幕尺寸调整样式 */
@media (max-width: 1400px) {
  .left-section, .right-section {
    flex: 0 0 50%; /* 在较小屏幕上，左右两侧各占50% */
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; /* 在更小的屏幕上，改为垂直布局 */
  }
  .left-section, .right-section {
    flex: 1;
    padding: 50px;
    width: 100%; /* 左右两侧宽度均为100% */
  }
}





/* 主标题和副标题 */
.main-header {
    position: absolute;
    z-index: 10;
    top: 105px; /* 根据实际需求调整距离顶部的距离，确定垂直位置，这里示例数值可按需更改 */
    left: 60px; /* 根据实际需求调整距离左边的距离，确定水平位置 */
    width: 900px;
    height: 300px;
    font-family: 'DeYiHei'; 
    /* font-family: 'Inter'; */
    /* font-family: 'SiYuanHeiTiB'; */
    /* font-family: 'SiYuanHeiTiR'; */

    padding-top: 60px;
    text-align: left;

	
}
.main-header p{
	display: inline-block;
}

/* .main-header p:nth-child(1),.main-header p:nth-child(2) {
  font-size: 80px;
} 
.main-header p:nth-child(4),.main-header p:nth-child(5) {
  font-size: 40px;
}  */



.main-header p:nth-child(1) {
  padding-left: 80px;
    font-size: 115px;
    letter-spacing: 6px;
    line-height: 130px;
    color: rgba(17, 17, 17, 1);
    
    vertical-align: bottom;
    margin-bottom: 20px;
	
}
.main-header p:nth-child(2) {
    font-size: 115px;
    letter-spacing: 6px;
    line-height: 130px;
    
    vertical-align: bottom;
	  color: #557c83;
    margin-bottom: 20px;
}
.main-header p:nth-child(4) {
  padding-left: 85px;
    font-size: 53px;
    letter-spacing: 7px;
    line-height: 70px;
    color: rgba(17, 17, 17, 1);
    vertical-align: bottom;
}
.main-header p:nth-child(5) {
    font-size: 53px;
    letter-spacing: 6px;
    line-height: 70px;
    vertical-align: bottom;
	  color: #557c83;
}


/* 中间图片样式 */
.image-rider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    z-index: 7;
}

.image-rider img {
  width: 260px;
  height: 340px;
}
/* 遮罩层样式 */
.Masking-Layer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    z-index: 8;
}

.Masking-Layer img {
  width: 260px;
  height: 340px;
}

/* 底部绿幕样式 */
.Green-Screen {
    position: absolute;
    top: calc(50% + 30px); /* 通过calc函数，在原本50%的基础上增加10px，实现向下移动10px */
    left: calc(50% + 50px); /* 根据中间图片宽度的一半（240px的一半为120px，这里稍微调整为140px，可根据实际效果微调）来向左偏移，使其左侧紧贴中间图片左侧 */
    transform: translate(-50%, -50%);
    z-index: 6;
}

.Green-Screen img {
    width: 310px; /* 让图片宽度占满容器 */
    height: 320px; /* 根据图片比例自动调整高度 */
}

/* 右下角图片样式 */
.bottom-right-image {
    position: absolute; /* 设置为绝对定位 */
    bottom: 0; /* 调整距离底部的距离 */
    right: 0; /* 调整距离右侧的距离 */
    z-index: 2; /* 确保右下角图片在最上层 */
}

.bottom-right-image img {
    width: 350px;
    height: 225px;
}


/* 作者介绍 */
.text-content {
  position: absolute; /* 子绝，很重要 */
  z-index: 5;
  left: 60px; 
  bottom: 110px;
  color: #557C83;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  font-family: 'Inter'; /* 应用引入Inter的字体 */
  width: 650px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
  box-sizing: border-box; /* 确保内边距和边框包含在宽度和高度内 */
}

.text-content p:nth-child(1) {
  font-size: 22px;
  text-align: center;
}

.text-content p:nth-child(3) {
  text-align: center;
}

/* 数据 */
.container .stats-footer {
  position: absolute;
  bottom: 0;
  left: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px; /* 设置固定宽度 */
  height: 100px; /* 设置固定高度 */
  box-sizing: border-box;
}

.stats-footer div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px; /* 调整间距 */
  color: #47686EFF;
}

.stats-footer span {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 12px;
  font-family: 'SiYuanHeiTiB'; /* 应用引入思源黑体B的字体 */
}

.stats-footer p {
  font-size: 12px;
  color: #557C83;
  font-family: 'SiYuanHeiTiR'; /* 应用引入思源黑体R的字体 */
}

.next-page {
  position: absolute;
  z-index: 5;
  bottom: 20px;
  left: 645px;
}
.next-page a {
  text-align: center;
  color: #a6a6a6;
  text-decoration: none; /* 去掉下划线 */
  left: 643px;
}
/* 定义关键帧动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px); /* 调整这个值来改变移动的距离 */
  }
}

/* 应用动画到图片 */
.next-page img {
  animation: bounce 1.5s infinite; /* 1秒的动画，无限循环 */
}
</style>
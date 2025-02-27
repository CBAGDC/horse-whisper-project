<template>
  <div id="app">



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


    
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme';

export default {
  name: 'Navbar',
  setup() {
    const themeStore = useThemeStore();
    return { themeStore };
  },
  data() {
    return {
      isTranslated: false
    };
  },
  computed: {
    brightnessText() {
      return this.themeStore.isBright ? 'Dark Mode' : 'Light Mode';
    }
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
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
    }
  },
  mounted() {
    this.$i18n.locale = 'en'; // 默认语言
    document.body.classList.toggle('dark-mode', !this.themeStore.isBright);
    this.themeStore.initializeTheme(); // 初始化主题
  }
};
</script>

  
  
  <style scoped>
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
  
  
  .navbar {
      position: absolute; /* 将导航栏设置为绝对定位，使其脱离文档流，能相对于父元素（这里是.right-section）进行定位 */
      top: 30px; /* 根据需求调整距离顶部的距离，这里示例设为20px */
      right: 15px; /* 根据需求调整距离左侧的距离，这里示例设为20px */
      z-index: 998; /* 设置较高的层级，让它浮在黑色区域之上，数值越大层级越高 */
      width: 100%;
  } 
  
  .navbar ul {
      display: flex; /* 使用flex布局让li元素横向排列 */
      float: right;
  } 
  
  .navbar ul li {
    list-style: none;
    opacity: 1;
    border-radius: 15px;
    background: rgba(105, 105, 105, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    margin-right: 20px; /* 可以根据需要设置li元素之间的间距，这里设为20px */
    display: inline-flex; /* 将li元素设置为inline-flex布局容器，使其宽度根据内容自动调整 */
    justify-content: center; /* 水平方向居中对齐内容 */
    align-items: center; /* 垂直方向居中对齐内容 */
    padding: 3px 8px; /* 调整内边距，确保内容不会紧贴边缘 */
  } 
  
  .navbar ul li a {
    opacity: 1;
    z-index: 2;
    /* font-family: 'SiYuanHeiTiR'; */
    /* font-family: 'SiYuanHeiTiB'; */
    /* font-family: 'Inter'; */
    /* font-family: 'DeYiHei';  */
    font-size: 16px;
    line-height: 20px;
    color: white;
    text-align: center; /* 水平居中文本 */
    text-decoration: none;
    font-weight: 100;
    display: flex; /* 将a元素设置为flex布局容器，方便内部元素对齐 */
    justify-content: center; /* 水平方向居中对齐内容 */
    align-items: center; /* 垂直方向居中对齐内容 */
  }  
  
  .navbar ul li.c {
    opacity: 0.5; /* 初始透明度 */
    transition: opacity 0.3s ease; /* 添加过渡效果 */
  } 
  .navbar ul li.c:hover {
    opacity: 1; /* 鼠标悬停时的透明度 */
  } 
  
  .navbar ul li.icon-item {
    padding: 0; /* 移除内边距 */
    background-color: transparent; /* 去除背景色，让图标背景透明 */
    color: #72adb8;
    border: none; /* 去除边框 */
    margin-right: 8px; /* 增加 margin-right，让后一个图标与前一个图标之间有一定的间距 */
    display: flex; /* 将li元素设置为flex布局容器，方便内部元素对齐 */
    justify-content: center; /* 水平方向居中对齐内容 */
    align-items: center; /* 垂直方向居中对齐内容 */
    opacity: 0.5; /* 初始透明度 */
    transition: opacity 0.3s ease; /* 添加过渡效果 */
  } 
  .navbar ul li.icon-item:hover {
    opacity: 1; /* 鼠标悬停时的透明度 */
  }
  
  .navbar ul li.icon-item img {
    width: 30px; /* 根据图标大小调整宽度，示例设为30px */
    height: 30px; /* 根据图标大小调整高度，示例设为30px */
    object-fit: contain; /* 让svg图标保持比例自适应显示在li元素内 */
  }  
  
  
  </style>
  
  
<template>
  <div id="app">
     <!-- 首页图标 -->
     <div class="home-icon">
      <router-link to="/">
        <img src="./icons/首页.svg" alt="首页图标">
      </router-link>
    </div>
        <!-- 导航栏 -->
    <nav class="navbar">
      <ul>
        <li class="c"><router-link to="/MaHorses">{{ $t('translation.myPersonalStory') }}</router-link></li>
        <li class="c"><router-link to="/RatStories">{{ $t('translation.ridersStories') }}</router-link></li>
        <li class="c"><router-link to="/AEquestrian">{{ $t('translation.aboutEquestrian') }}</router-link></li>
        <li class="c"><router-link to="/AHorses">{{ $t('translation.aboutHorses') }}</router-link></li>
        
        <!-- 添加用于翻译图标的li元素 -->
        <li class="icon-item" @click="handleTranslateClick">
          <img src="./icons/翻译.svg" alt="翻译图标">
        </li>
        <!-- 添加用于亮度图标的li元素 -->
        <li class="icon-item" @click="handleBrightnessClick">
          <img src="./icons/亮度.svg" alt="亮度图标">
        </li>
        <!-- 添加用于注册登录的li元素 -->
        <li class="icon-item" @click="navigateToLogin">
          <img src="./icons/注册登录.svg" alt="注册登录图标">
        </li>
      </ul>
    </nav>

    <!-- 头部组件 -->
    <!--  <Header /> -->

    <!-- 渲染路由匹配到的组件 -->
    <router-view></router-view>

    <!-- 其他全局组件或布局 -->
  </div>
</template>


<script>

import Header from './en/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    brightnessText() {
      return this.$store.getters.isBright ? 'Dark Mode' : 'Light Mode';
    }
  },
  methods: {
    navigateToLogin() {
    this.$router.push({ name: 'Login' }); // 确保名称与路由配置中的名称一致
   },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
    },
    handleBrightnessClick() {
      this.$store.dispatch('toggleBrightness');
      this.updateBrightness();
    },
   
    updateLanguage() {
      const newLocale = this.isTranslated ? 'zh' : 'en';
      this.$i18n.locale = newLocale;
      console.log(`Language switched to ${newLocale}`);
    },
    updateBrightness() {
      document.body.classList.toggle('dark-mode', !this.$store.getters.isBright);
      console.log(`Brightness switched to ${this.$store.getters.isBright ? 'Dark' : 'Light'}`);
    }
  },
  mounted() {
    // 确保页面加载时初始化语言和亮度设置
    this.$i18n.locale = 'en'; // 默认语言
    document.body.classList.toggle('dark-mode', this.$store.getters.isBright);
  }
};
</script>


<style scoped>
@font-face {
    font-family: 'Inter';
    src: url('../fonts/Inter-Medium.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
} 
@font-face {
    font-family: 'SiYuanHeiTiB';
    src: url('../fonts/SourceHanSansSC-Bold.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
} 

@font-face {
    font-family: 'SiYuanHeiTiR';
    src: url('../fonts/SourceHanSansSC-Regular.otf') format('woff2');
    font-weight: normal;
    font-style: normal;
} 


#app{
position: relative;
}

.home-icon {
  position: absolute;
  top: 25px; /* 根据需求调整距离顶部的距离，这里示例设为20px */
  left: 15px; /* 根据需求调整距离左侧的距离，这里示例设为20px */
  z-index: 999; /* 设置较高的层级，让它浮在其他元素之上 */
} 
.home-icon img{
  width: 30px; /* 根据图标大小调整宽度，示例设为30px */
  height: 30px; /* 根据图标大小调整高度，示例设为30px */
   
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


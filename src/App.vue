<!-- src/App.vue -->
<template>
  <div id="app">
     <!-- 首页图标 -->
     <HomeIcon />
    <!-- 渲染路由匹配到的组件 -->
    <router-view></router-view>
    <!-- 其他全局组件或布局 -->
  </div>
</template>

<script>
import { useThemeStore } from './stores/theme'; // 确保这是 Pinia 的 store
import HomeIcon from './en/HomeIcon.vue';
import Navbar from './en/Navbar.vue';

export default {
  name: 'App',
  components: {
    HomeIcon,
    Navbar
  },
  setup() {
    const themeStore = useThemeStore();

    return {
      themeStore
    };
  },
  mounted() {
    // 确保页面加载时初始化语言
    this.$i18n.locale = 'en'; // 默认语言
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

#app {
  position: relative;
}
</style>
<template>
  <div class="navbar-container" :class="{ 'hidden': !isNavbarVisible }">
    <nav class="navbar">
      <div class="navbar-text">
        <button class="text-box" @click="navigateToLogin">马的艺术</button>
      </div>
      <ul class="navbar-actions">
        <li class="navbar-item" @click="toggleDarkModeAndIcon">
          <i
            :class="[theme.isBright ? 'fas fa-sun' : 'fas fa-moon', theme.isDarkMode ? 'el-icon-moon-night custom-icon' : 'el-icon-sunny custom-icon']"
          ></i>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter
import { useThemeStore } from '@/stores/theme';

const theme = useThemeStore();
const router = useRouter(); // 创建 router 实例

const isNavbarVisible = ref(true); // 用于控制导航栏的显示和隐藏

const toggleDarkModeAndIcon = () => {
  theme.toggleDarkMode();
  document.body.classList.toggle('dark', theme.isDarkMode);
};

const navigateToLogin = () => {
  router.push({ name: 'EquineArt' }); // 跳转到 EquineArt 页面
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 50) { // 当滚动超过50px时隐藏导航栏
    isNavbarVisible.value = false;
  } else {
    isNavbarVisible.value = true;
  }
};

onMounted(() => {
  theme.initializeTheme();
  document.body.classList.toggle('dark', theme.isDarkMode);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: transparent;
  z-index: 9;
  transition: top 0.3s ease; /* 添加过渡效果 */
  top: 0;
}

.navbar-container.hidden {
  top: -100px; /* 根据导航栏的高度调整 */
}

.navbar {
  position: absolute;
  top: 5px;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.navbar-text {
  position: absolute;
  top: 20px;
  left: 100px;
}

.text-box {
  width: 100px;
  height: 50px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  border-radius: 15px;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  outline: none;
  cursor: pointer; /* 添加鼠标指针样式 */
}
.text-box:hover {
  background-color: rgb(83, 83, 83,0.8);
  opacity: 1;
}
.navbar-actions {
  position: absolute;
  top: 15px;
  right: 0;
}

.navbar-item {
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s ease;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* iPhone 14 Pro Max (430px) */
@media (min-width: 413px) and (max-width: 431px){
  .navbar-text{
    position: absolute;
    top: 10px;
  }

  .navbar-actions{
    position: absolute;
    top: 10px;
    right: 25px;
  }
}
</style>
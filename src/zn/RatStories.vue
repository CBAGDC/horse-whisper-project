<template>
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
  <div class="container" :style="{ backgroundColor: isBright ? '#f0f0f0' : '#111' }">
    <div class="text">
      <p :style="{ color: isBright ? 'black' : 'white' }">骑士们</p>
      <p :style="{ color: isBright ? 'black' : 'white' }">的</p>
      <p>故事</p>
    </div>
    <div class="raright">
      <img src="../assets/image/rider-k.png" alt="Rider on horse" class="float-img">
      <p class="bg-color"></p>
      <a href="#" class="mp-more" @click="handleNextPageClick">更多 ></a>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

export default {
  setup() {
    const themeStore = useThemeStore();
    const isBright = computed(() => themeStore.isBright);

    return { themeStore, isBright };
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
    handleNextPageClick() {
      console.log('Next page clicked');
      this.$router.push('/zRaone');
    },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
      this.$router.push('/RatStories');
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
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    }
  },
  mounted() {
    this.$i18n.locale = 'zh'; // 默认语言
    document.body.classList.toggle('dark-mode', !this.themeStore.isBright);
    this.themeStore.initializeTheme(); // 初始化主题
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*引入得意黑字体*/
@font-face {
  font-family: 'DeYiHei';
  src: url('../assets/fonts/SmileySans-Oblique.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.container {
  z-index: 0;
  position: relative;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
}

.text {
  position: absolute;
  left: 180px;
  top: 150px;
}

.text p {
  font-family: 'DeYiHei';
  font-size: 100px;
  margin: 10px;
}

.text p:nth-child(3) {
  color: #557c83;
}

/* 为图片添加类名并设置样式 */
.float-img {
  z-index: 2;
  position: absolute;
  right: 130px;
  bottom: 0;
  width: 500px;
  height: 650px;
}

/* 为背景色的p元素添加类名并设置样式 */
.bg-color {
  z-index: 1;
  position: absolute;
  right: 90px;
  bottom: 0;
  width: 750px;
  height: 370px;
  background-color: #557c83;
}

.mp-more {
  position: absolute;
  right: 100px;
  top: 130px;
  color: #557c83;
  font-family: 'DeYiHei';
  font-size: 36px;
  text-decoration: none;
}


@media (min-width: 413px) and (max-width: 431px) {
  .container {
    padding: 10px;
  }

  .text {
    left: 20px;
    top: 200px;
  }

  .text p {
    font-size: 75px;
  }
  .text p:nth-child(4){
    position: absolute;
    left: 0;
    top: 300px;
    visibility: visible;
  }

  .float-img {
    right: -50px;
    bottom: 70px;
    width: 325px;
    height: 500px;
  }

  .bg-color {
    right: 0;
    bottom: 0;
    width: 175px;
    height: 400px;
  }

  .mp-more {
    left: 50px;
    top: 800px;
    font-size: 24px;
  }
}
</style>
<template>
    <!-- 导航栏 -->
    <nav class="navbar">
      <ul>
        <li class="c"><router-link to="/MaHorses">My Personal Story</router-link></li>
        <li class="c"><router-link to="/RatStories">Riders and their Stories</router-link></li>
        <li class="c"><router-link to="/AEquestrian">About Equestrian</router-link></li>
        <li class="c"><router-link to="/AHorses">About Horses</router-link></li>
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
    
  <div class="ah-container" :style="{ backgroundColor: backgroundColor }">
    <div class="ah-bg"></div>
    <img src="../assets/image/horse-1.png" alt="Horse 1" class="horse-image">
    <div class="text-ah">
      <p class="ah-p1" :style="{ color: textColorP1P3 }">Knowledge of</p>
      <p class="ah-p2">horses.</p>
      <p class="ah-p3" :style="{ color: textColorP1P3 }">Here I will introduce the way horses communicate with each other, the psychological healing effect of horses and why we love horses.</p>
      <router-link to="/ahone" class="more-link">more ></router-link>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme';

export default {
  name: 'AHorses',
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
    backgroundColor() {
      return this.themeStore.ahOpdBackgroundColor;
    },
    textColorP1P3() {
      return this.themeStore.isDarkMode ? 'white' : 'black';
    },
    brightnessText() {
      return this.themeStore.isBright ? 'Dark Mode' : 'Light Mode';
    }
  },
  methods: {
    navigateToLogin() {
      window.location.href = 'http://j.cwebcrm.cn/';
    },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
      if (this.isTranslated) {
        this.$router.push({ name: 'zAHorses', params: { lang: 'zh' } });
      } else {
        this.$router.push({ name: 'AHorses', params: { lang: 'en' } });
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
/* 引入得意黑字体 */
@font-face {
    font-family: 'DeYiHei';
    src: url('../assets/fonts/SmileySans-Oblique.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

body, html {
    margin: 0;
    padding: 0;
}

.ah-container {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
    /* 确保容器高度至少撑满视口高度 */
}

.ah-bg {
    position: absolute;
    bottom: 0;
    width: 700px;
    height: 380px;
    background-color: #3aaca7;
    z-index: 1;
}

.horse-image {
    position: absolute;
    bottom: 0;
    left: 80px;
    width: 700px;
    height: 740px;
    z-index: 1;
}

.text-ah {
  position: absolute;
        top: 50px;
        right: 0;
        width: 500px;
        height: 600px;
        z-index: 2;
        font-family: 'DeYiHei';    
}

.text-ah .ah-p1 {
  position: absolute;
    top: 100px;
    left: -170px;
    font-size: 65px;
}

.text-ah .ah-p2 {
  position: absolute;
  top: 180px;
  left: -170px;
    color: #557c83;
    font-size: 65px;
}

.text-ah .ah-p3 {
  position: absolute;
  top: 280px;
  left: -170px;
  right: 200px;
  font-size: 32px;
}

.more-link {
  position: absolute;
      bottom: 40px;
      right: 300px;
      color: #557c83;
      font-size: 30px;
      text-decoration: none;
}


@media (min-width: 413px) and (max-width: 431px) {
  .ah-container {
    background-color: #f0f0f0 !important;
    position: relative;
  }

  .ah-bg {
    position: absolute ;
    right: 50px;
    width: 170px;
    height: 350px; 
  }

  .horse-image {
    width: 350px;
    height: 400px; 
  }

  .text-ah {
    position: relative ;
    /* width: 100%; */
    /* height: auto; */
    /* padding: 20px;  */
    /* text-align: center; */
  }

  .text-ah .ah-p1,
  .text-ah .ah-p2 {
    left: 20px;
    font-size: 40px; 
  }

  .text-ah .ah-p2 {
    color: #557c83;
    position: absolute;
    top: 100px;
    left: 225px;
  }
  .text-ah .ah-p3{
    position: absolute;
    top: 160px;
    left: 20px;
    width: 350px;
    height: 200px;
    font-size: 35px; 

  }

  .more-link {
    position: absolute;
    left: 45px;
}
}
</style>
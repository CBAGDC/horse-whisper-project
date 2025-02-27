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

  <div :class="{'ma-container': true, 'dark-mode': themeStore.isDarkMode}">
    
    <div class="ma-header">
      <p :style="{ color: themeStore.isDarkMode ? '#fff' : '#000' }">The Story of&nbsp;</p>
      <p>Me and Horses</p>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">
        <img src="../assets/image//下一页.png" alt="" class="img1">
      </button>

    <div class="ma-sections">
      <div 
        v-for="(item, index) in visibleItems" 
        :key="index" 
        :class="{'ma-content': true, 'dark-mode': themeStore.isDarkMode, 'text-top': index % 2 === 0, 'text-bottom': index % 2 !== 0}"
      >
        <div v-if="index % 2 === 0">
          <p class="m1">{{ item.title }}</p>
          <p class="m2">{{ item.publisherName }}</p>
          <p class="m2">{{ item.publishTime }}</p>
          <img :src="item.picurl" :alt="item.title" @click="navigateToArticle(item.id)">
        </div>
        <div v-else>
          <img :src="item.picurl" :alt="item.title" @click="navigateToArticle(item.id)">
          <p class="m1">{{ item.title }}</p>
          <p class="m2">{{ item.publisherName }}</p>
          <p class="m2">{{ item.publishTime }}</p>
        </div>
      </div>
    </div>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">
        <img src="../assets/image/下一页.png" alt="" class="img2">
      </button>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme';
import { watch } from 'vue';
import axios from 'axios';

export default {
  name: 'MaHorses',
  setup() {
    const themeStore = useThemeStore();

    watch(
      () => themeStore.isDarkMode,
      (newValue) => {
        document.body.classList.toggle('dark-mode', newValue);
      }
    );

    return { themeStore };
  },
  data() {
    return {
      isTranslated: false,
      items: [],
      currentPage: 0,
      itemsPerPage: 3
    };
  },
computed: {
  totalPages() {
    return Math.ceil(this.items.length / this.itemsPerPage);
  },
  visibleItems() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.items.slice(start, end); 
  }
},
  methods: {
    navigateToLogin() {
      window.location.href = 'http://j.cwebcrm.cn/';
    },
    handleTranslateClick() {
      this.isTranslated = !this.isTranslated;
      this.updateLanguage();
      const routeName = this.$i18n.locale === 'zh' ? 'zMaHorses' : 'MaHorses';
      this.$router.push({ name: routeName });
    },
    handleBrightnessClick() {
      try {
        this.themeStore.toggleDarkMode();
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
      document.body.classList.toggle('dark-mode', this.themeStore.isDarkMode);
      console.log(`Brightness switched to ${this.themeStore.isDarkMode ? 'Dark' : 'Light'}`);
    },
    fetchData() {
      axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list?classid=5')
        .then(response => {
          this.items = response.data.data.list;
          console.log(this.items); // 添加日志
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    navigateToArticle(articleId) {
      this.$router.push({ name: 'ArticleDetail', params: { id: articleId } });
    }
  },
  mounted() {
    this.$i18n.locale = 'en';
    document.body.classList.toggle('dark-mode', this.themeStore.isDarkMode);
    this.themeStore.initializeTheme();
    this.fetchData();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* 引入得意黑字体 */
@font-face {
  font-family: 'DeYiHei';
  src: url('../assets/fonts/SmileySans-Oblique.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.ma-container {
  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden; /* 隐藏滚动条 */
}

.ma-container.light-mode {
  background-color: #f0f0f0;
}

.ma-container.dark-mode {
  background-color: #111;
}

.ma-header {
  display: flex;
  text-align: left;
}

.ma-header p {
  position: absolute;
  z-index: 1;
  font-size: 52px;
  top: 50px;
  font-family: 'DeYiHei';
  word-spacing: 5px;
  letter-spacing: 3px;
}

.ma-header p:nth-child(1) {
  left: 70px;
  color: black;
}

.ma-header p:nth-child(2) {
  left: 360px;
  color: #557c83;
}

.ma-sections {
  display: flex;
  gap: 100px; /* 添加空隙 */
  justify-content: center; /* 水平居中 */
  flex-wrap: wrap;
  margin-top: 165px;
}

.ma-content {
  width: 325px;
  height: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative; /* 添加相对定位 */
}

.ma-content.light-mode {
  background-color: #fff;
}

.ma-content.dark-mode {
  background-color: #000;
}

.ma-content img {
  max-width: 100%;
  width: 100%;
  height: 320px;
  cursor: pointer; /* 添加鼠标指针样式 */
}

.ma-content.text-top img {
  position: absolute;
  bottom: 0;
}

.ma-content.text-bottom img {
  position: absolute;
  top: 0;
}

.ma-content.text-bottom .m1{
  margin-top: 350px;
}
.ma-content p {
  position: relative;
  margin: 15px 25px;
  line-height: 1.5;
  z-index: 2;
}

.ma-content .m1 {
  font-size: 20px; 
  margin-top: 40px;
  margin-left: 40px;
}

.ma-content .m2 {
  font-size: 16px; 
  margin-top: 10px;
  margin-left: 40px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 320px;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-container img:nth-child(1) {
  z-index: 1;
}

.image-container img:nth-child(2) {
  z-index: 2;
}

.ma-content img:nth-child(1) {
  position: absolute; /* 修改为绝对定位 */
  bottom: 0;
  left: 0;
  z-index: 1;
}

.ma-content img:nth-child(3) {
  position: absolute; /* 修改为绝对定位 */
  bottom: 0;
  left: 0;
  z-index: 2;
}

/* 分页按钮样式 */
.pagination {
  position: fixed;
  bottom: 25px;
  display: flex;
  width: 100%;
}

.pagination button {
  font-size: 14px;
  cursor: pointer;
  width: 75px;
  height: 75px;
  margin: auto;
  border-radius:50%;
  border: 1px solid #848484;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.pagination button .img1 {
  padding: 5px 12px 25px 10px;
  width: 50px;
  height: 50px;
  transform: rotate(90deg);
}
.pagination button .img2 {
  padding: 5px 12px 25px 10px;
  width: 50px;
  height: 50px;
  transform: rotate(-90deg);
}




@media (min-width: 413px) and (max-width: 431px) {
  .ma-container {
    background-color: #f0f0f0;
    /* overflow-y: auto;  */
    height: 100vh; 
  }

  .ma-header p {
    font-size: 32px;
    top: 90px;
  }

  .ma-header p:nth-child(1) {
    left: 50px;
  }

  .ma-header p:nth-child(2) {
    top: 130px;
    left: 50px;
  }


  .ma-content {
    width: 100%;
    height: auto;
    box-shadow: none;
  }

  .ma-content img {
    height: auto;
  }

  .ma-content.text-top {
    background: #ffffff;
    width: 350px;
    height: 700px;
  }
  .ma-content.text-bottom{
    background: #ffffff;
    width: 350px;
    height: 700px;
  }

  .ma-content .m1 {
    margin-top: 90px;
    margin-left: 100px;
  }

  .ma-content .m2 {
    margin-top: 5px;
    margin-left: 100px;
  }

  .image-container {
    height: auto;
  }

  .pagination {
    position: absolute;
    left: -30px;
    bottom: 450px; 
    width: 430px;
    height: 450px;
  }

  .pagination button {
    visibility: hidden;
  opacity: 0;
  }
}
</style> 
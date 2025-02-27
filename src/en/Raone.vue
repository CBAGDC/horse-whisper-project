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

<div class="container" :style="{ backgroundColor: themeStore.getContainerBackgroundColor }">
 <div class="pagination">
   <button :disabled="!articleData.prevArticle" @click="handlePrevPageClick">
     <img src="../assets/image/下一页.png" alt="" class="img1"></button>
   <div class="ah-omain" :style="{ backgroundColor: themeStore.getAhOpdBackgroundColor }">
     <div class="ah-opd">
       <div class="text-section">
         <div class="white-background"></div>
         <h1>{{ articleData.title }}</h1><br>
         <p>{{ articleData.publisherName }}</p>
         <p>{{ articleData.publishTime }}</p>
       </div>
       <div class="image-section">
         <img :src="articleData.picurl" alt="Silhouette of a person and a horse" @click="navigateToArticle(articleData.id)">
       </div>
     </div>
   </div>
   <button :disabled="!articleData.nextArticle" @click="handleNextPageClick">
     <img src="../assets/image/下一页.png" alt="" class="img2"></button>
 </div>
</div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { useRouter } from 'vue-router'; // 引入 useRouter
import { useI18n } from 'vue-i18n'; // 引入 useI18n

export default {
name: 'AHone',
setup() {
 const router = useRouter(); // 初始化路由实例
 const themeStore = useThemeStore();
 const i18n = useI18n(); // 初始化国际化实例
 const articleData = ref({
   id: '',
   title: '',
   picurl: '',
   publisherName: '',
   publishTime: '',
   prevArticle: null,
   nextArticle: null
 });

 const fetchArticleData = async (articleId = '16') => {
   try {
     const response = await axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list?classid=6');
     console.log('API Response:', response.data); // 检查API响应
     if (response.data.code === '00000') {
       const articles = response.data.data.list;
       const currentArticleIndex = articles.findIndex(article => article.id === articleId);
       const currentArticle = articles[currentArticleIndex];

       if (currentArticle) {
         articleData.value.id = currentArticle.id;
         articleData.value.title = currentArticle.title;
         articleData.value.picurl = currentArticle.picurl.replace(/\\/g, '/'); // 处理图片路径
         articleData.value.publisherName = currentArticle.publisherName; // 直接赋值
         articleData.value.publishTime = currentArticle.publishTime; // 直接赋值

         articleData.value.prevArticle = currentArticleIndex > 0 ? articles[currentArticleIndex - 1] : null;
         articleData.value.nextArticle = currentArticleIndex < articles.length - 1 ? articles[currentArticleIndex + 1] : null;
       } else {
         console.error('Article not found');
       }
     } else {
       console.error('API returned an error code:', response.data.code);
     }
   } catch (error) {
     console.error('Error fetching article data:', error);
   }
 };

 const navigateToArticle = (articleId) => {
   router.push({ name: 'ArticleDetail', params: { id: articleId } });
 };

 const navigateToLogin = () => {
  window.location.href = 'http://j.cwebcrm.cn/';
 };

 const handleTranslateClick = () => {
   router.push({ name: 'zRaone' }); // 跳转到 zn 的 zAHone 页面
 };

 const handleBrightnessClick = () => {
   try {
     themeStore.toggleDarkMode(); // 确保调用的是 toggleDarkMode 方法
     document.body.classList.toggle('dark-mode', !themeStore.isBright);
     console.log(`Brightness switched to ${themeStore.isBright ? 'Dark' : 'Light'}`);
   } catch (error) {
     console.error('Error toggling brightness:', error);
   }
 };

 const handlePrevPageClick = () => {
   if (articleData.value.prevArticle) {
     fetchArticleData(articleData.value.prevArticle.id);
   }
 };

 const handleNextPageClick = () => {
   if (articleData.value.nextArticle) {
     fetchArticleData(articleData.value.nextArticle.id);
   }
 };

 const handleKeyDown = (event) => {
   if (event.key === 'Enter') {
     handleNextPageClick();
   }
 };

 return { themeStore, articleData, fetchArticleData, navigateToArticle, navigateToLogin, handleTranslateClick, handleBrightnessClick, handlePrevPageClick, handleNextPageClick, handleKeyDown };
},
mounted() {
 console.log('Component mounted, fetching article data...');
 this.fetchArticleData().then(() => {
   console.log('Article data after fetch:', this.articleData);
 });
 window.addEventListener('keydown', this.handleKeyDown);
 this.themeStore.initializeTheme(); // 初始化主题
 this.$i18n.locale = 'en'; // 默认语言
 document.body.classList.toggle('dark-mode', !this.themeStore.isBright);
},
beforeDestroy() {
 window.removeEventListener('keydown', this.handleKeyDown);
},
};
</script>

<style scoped>
/* 整体容器样式 */
.container {
display: flex;
justify-content: space-between;
background-color: #f0f0f0; /* 默认背景颜色 */
}

.ah-omain {
min-width: 180vh;
min-height: 100vh;
margin: auto;
background-color: white;
display: flex;
}

.ah-opd {
display: flex;
min-width: 160vh;
padding: 50px;
margin: auto;
}

/* 文本部分样式 */
.text-section {
flex: 1;
width: 100px;
height: 500px;
padding: 50px 20px;
margin: auto;
}

.text-section h1 {
padding-top: 80px;
font-size: 32px;
}

.text-section p {
font-size: 18px;
line-height: 1.5;
margin-right: 30px;
}

/* 图像部分样式 */
.image-section {
flex: 0 70%;
margin: auto;
}

.image-section img {
margin-top: 30px;
width: 95%;
height: auto;
}

/* 分页按钮样式 */
.pagination {
display: flex;
justify-content: space-between;
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




/* iPhone 14 Pro Max (430px) */
@media (min-width: 413px) and (max-width: 431px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .ah-omain {
    min-width: 100%;
    min-height: auto;
    margin: 0;
    background-color: inherit;
    flex-direction: column;
  }

  .ah-opd {
    min-width: 100%;
    padding: 20px;
    margin: 0;
    display: flex;
    flex-direction: column; /* 使子元素垂直排列 */
  }

  .text-section {
    width: 100%;
    height: auto;
    padding: 20px;
    margin: 0;
  }

  .text-section h1 {
    padding-top: 20px;
    font-size: 24px;
  }

  .text-section p {
    font-size: 16px;
    line-height: 1.4;
    margin-right: 0;
  }

  .image-section {
    flex: 1;
    margin: 20px 0;
  }

  .image-section img {
    width: 90%;
    height: auto;
  }

  .pagination {
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 20px; /* 添加间距 */
  }

  .pagination button:nth-child(1) {
    position: absolute;
    left: 50px;
    bottom: -100px;
  }
  .pagination button:nth-child(3) {
    position: absolute;
    right: 50px;
    bottom: -100px;
  }
}
</style>
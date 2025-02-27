<template>
  <div class="home-container">
    <!-- 导航条 -->
    <Navbart />
    
    <!-- 背景轮播 -->
    <Images />

    <!-- 品牌 -->
    <Brand />

    <!-- 文章列表 -->
    <ArticleList />

    <!-- 进度条和向上滚动按钮 -->
    <ProgressAndScrollTop 
      :progress="progressStore.progress" 
      :showProgress="progressStore.showProgress"
      :class="{ visible: progressStore.showProgress }"
    />
  </div>
</template>

<script>
import { useProgressStore } from '@/stores/progress';
import Navbart from './Navbart.vue';
import Images from './Swiper/Images.vue';
import Brand from './Brand.vue';
import ArticleList from '../Article/ArticleList.vue';
import ProgressAndScrollTop from './ProgressAndScrollTop.vue';

export default {
  components: {
    Navbart,
    Images,
    Brand,
    ArticleList,
    ProgressAndScrollTop
  },
  setup() {
    const progressStore = useProgressStore();
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        progressStore.updateProgress(Math.round((scrollTop / scrollHeight) * 100));
      }
      if (scrollTop > 100) {
        progressStore.setShowProgress(true);
      } else {
        progressStore.setShowProgress(false);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);

    return {
      progressStore,
      scrollToTop,
      handleScroll // 将 handleScroll 返回，使其在组件实例中可访问
    };
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // 使用 this.handleScroll 访问 handleScroll
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保页面高度至少为视口高度 */
}

.navbar-container {
  position: fixed;
  top: 0;
  width: 100%;
}

.brand-container {
  margin-top: 60px; 
  z-index: 2; /* 确保品牌部分在轮播图之上 */
}

.imgs {
  z-index: 1; /* 确保轮播图在底部 */
}

/* iPhone 14 Pro Max (430px) */
@media (min-width: 413px) and (max-width: 431px) {
  .brand-container {
    margin-top: -125px; /* 调整品牌部分的顶部间距 */
  }

  .imgs {
    height: 500px; /* 调整轮播图的高度 */
  }

  .article-list {
    font-size: 14px; /* 减小文章列表的字体大小 */
  }

  .progress-and-scroll-top {
    width: 80%; /* 调整进度条和滚动按钮的宽度 */
    left: 50%; /* 调整进度条和滚动按钮的位置 */
  }
}

</style>
<template>
  <div class="imgs">
    <ul v-if="articleList.length > 0">
      <li 
        class="item" 
        v-for="article in articleList" 
        :key="article.id" 
        :style="{
          'background-image': 'url(' + article.articleCover + ')'
        }"
      >
        <div class="slide-content">
          <router-link :to="`/article/${article.id}`" class="slide-title">{{ article.articleTitle }}</router-link>
          <span class="slide-time">发布时间：{{ formatDate(article.createTime) }}</span>
        </div>
      </li>
    </ul>
    <p v-else>暂无推荐文章</p>
  </div>
</template>

<script setup lang="ts">
import { getArticleRecommend } from "@/api/article";
import { ArticleRecommend } from "@/api/article/types";
import { formatDate } from "@/utils/date";
import { ref, onMounted } from 'vue';

// 定义并初始化 articleList
const articleList = ref<ArticleRecommend[]>([]);

// 从后端 API 获取推荐文章数据
const getArticleRecommendData = async (): Promise<void> => {
  try {
    const response = await getArticleRecommend();
    console.log('API Response:', response); // 添加日志输出
    articleList.value = response.data.data;
  } catch (error) {
    console.error('There was a problem with the getArticleRecommend operation:', error);
  }
};

onMounted(async () => {
  console.log('Component mounted'); // 添加日志输出
  await getArticleRecommendData();
});
</script>

<style lang="scss" scoped>
.imgs {
  position: relative;
  width: 100%;
  height: 13.875rem;
  margin: 1rem 0.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50% / cover;
  opacity: 0;
  animation: imageAnimation 36s linear infinite 0s;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &:nth-child(2) {
    animation-delay: 6s;
  }

  &:nth-child(3) {
    animation-delay: 12s;
  }

  &:nth-child(4) {
    animation-delay: 18s;
  }

  &:nth-child(5) {
    animation-delay: 24s;
  }

  &:nth-child(6) {
    animation-delay: 30s;
  }

  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 3.125rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 1;
  }

  .slide-title {
    font-size: 2rem;
    text-align: center;
    line-height: 1.5;
    margin: 0.125rem 0;
  }

  .slide-time {
    text-align: center;
    line-height: 1.5;
    margin: 0.125rem 0;
  }
}

.imgs::before {
  content: '推荐';
  position: absolute;
  z-index: 2;
  color: var(--grey-0);
  background: linear-gradient(90deg, var(--color-yellow), var(--color-orange));
  top: 0;
  letter-spacing: 0.1875rem;
  left: 0.625rem;
  font-size: 0.9375rem;
  width: 4.0625rem;
  display: flex;
  justify-content: center;
  border-radius: 0 0 0.75rem 0.75rem;
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}
</style>
<template>
  <!-- 文章 -->
  <div class="as9" :class="{ dark: themeStore.isDarkMode }">
    <div v-if="data && data.article" class="as-content" :class="{ dark: themeStore.isDarkMode }">
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">加载失败: {{ error }}</div>
      <div v-else>
        <h2 v-if="data.article.title">{{ data.article.title }}</h2>
        <img :src="data.article?.picurl || ''" alt="Article Image" v-if="data.article?.picurl" @error="handleImageError" />
        <div class="ascontent" v-html="sanitizedContent"></div>
        <div class="like-button-container">
          <button class="like-button" :class="{ 'liked': liked }" @click="toggleLike">
            <i class="fas fa-thumbs-up"></i>
            点赞
          </button>
        </div>
      </div>
      <router-link to="/Home" class="back-button">返回文章列表</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchArticle } from '@/composables/useFetchArticle'; // 确保路径正确
import sanitizeHtml from 'sanitize-html';
import { useThemeStore } from "@/store/index";

export default defineComponent({
  setup() {
    const route = useRoute();
    const themeStore = useThemeStore(); // 将 themeStore 引入到 setup 中
    const { data, loading, error, fetchArticle } = useFetchArticle();

    const liked = ref(false);

    onMounted(() => {
      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
      if (typeof id === 'string') {
        fetchArticle(id);
      } else {
        console.error('Invalid article ID:', route.params.id);
      }
    });

    const sanitizedContent = computed(() => {
      if (!data.value?.article?.content) return '';
      return sanitizeHtml(data.value.article.content, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'img', 'video', 'source'],
        allowedAttributes: {
          a: ['href', 'target'],
          img: ['src', 'alt'],
          video: ['controls', 'width', 'height'],
          source: ['src', 'type'],
        },
        allowedSchemes: ['http', 'https'],
      });
    });

    function handleImageError(event: Event) {
      console.error('图片加载失败:', event);
      // 隐藏图片
      (event.target as HTMLImageElement).style.display = 'none';
    }

    function toggleLike() {
      liked.value = !liked.value;
      console.log('点赞');
      // 这里可以添加点赞逻辑
    }

    return {
      data,
      loading,
      error,
      sanitizedContent,
      handleImageError,
      toggleLike,
      liked,
      themeStore, // 返回 themeStore 以便在模板中使用
    };
  },
});
</script>

<style>
/* 样式部分保持不变 */
.as9 {
  position: absolute;
  top: 545px;
  left: 0;
  width: 100%;
  z-index: 4;
  background-color: white;
}

.as-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin: 50px auto;
}

h2 {
  font-size: 2em;
  color: #000;
  margin-bottom: 30px;
}

.ascontent {
  text-align: left;
  margin: 10px auto;
  max-width: 700px;
}

.ascontent img {
  max-width: 100%;
  height: auto;
}
.ascontent video {
  max-width: 100%;
  height: auto;
}
.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

.like-button-container {
  margin-top: 20px;
  text-align: center;
}

.like-button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.liked {
  background-color: rgb(224, 51, 51);
  color: white;
}




@media (min-width: 413px) and (max-width: 431px) {
  .as9 {
    top: 500px; /* 根据需要调整顶部位置 */
  }

  .as-content {
    padding: 15px; /* 减少内边距以适应较小的屏幕 */
    max-width: 90%; /* 使用百分比宽度以适应屏幕 */
    margin: 20px auto;
  }

  h2 {
    font-size: 1.8em; /* 减少标题字体大小 */
  }

  .ascontent {
    max-width: 90%; /* 使用百分比宽度以适应屏幕 */
  }

  .ascontent img {
    max-width: 100%;
    height: auto;
  }

  .ascontent video {
    max-width: 100%;
    height: auto;
  }

  .back-button {
    padding: 8px 16px; /* 减少内边距以适应较小的屏幕 */
    font-size: 0.9em; /* 减少字体大小 */
  }

  .like-button-container {
    margin-top: 15px; /* 减少顶部间距 */
  }

  .like-button {
    padding: 8px 16px; /* 减少内边距以适应较小的屏幕 */
    font-size: 0.9em; /* 减少字体大小 */
  }
}
</style>
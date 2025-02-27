<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchArticle } from '@/composables/useFetchArticle';
import Waves from '../components/Waves.vue';
import Images from '../Home/Swiper/Images.vue';

interface Article {
  title: string;
  publishTime: string;
  publisherName: string;
  picurl?: string;
  content: string;
  comments: string;
  readcount: number; // 添加 readcount 字段
}

export default defineComponent({
  components: {
    Waves, // 注册 Waves 组件
    Images, // 注册 Images 组件
  },

  setup() {
    const route = useRoute();
    const { data, loading, error, fetchArticle } = useFetchArticle();

    onMounted(() => {
      console.log('Route params:', route.params);
      fetchArticle(route.params.id as string).then(() => {
        if (data.value) {
          console.log('Fetched article:', data.value.article);
        } else {
          console.log('No data fetched');
        }
      }).catch(err => {
        console.error('Failed to fetch article:', err);
      });
    });

    const article = computed(() => {
      return data.value?.article || null;
    });

    const wordCount = computed(() => {
      if (!article.value?.content) return 0;

      // 去除HTML标签和特殊字符
      const cleanContent = article.value.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

      // 匹配中文字符和英文单词
      const chineseCharacters = cleanContent.match(/[\u4e00-\u9fa5]/g) || [];
      const englishWords = cleanContent.match(/\b\w+\b/g) || [];

      // 合并结果并计算总字数
      const totalWords = chineseCharacters.length + englishWords.length;
      console.log('Chinese characters:', chineseCharacters); // 调试输出中文字符
      console.log('English words:', englishWords); // 调试输出英文单词
      console.log('Total words:', totalWords); // 调试输出总字数

      return totalWords;
    });

    const formattedWordCount = computed(() => {
      if (wordCount.value >= 1000) {
        return (wordCount.value / 1000).toFixed(1) + 'k';
      }
      return wordCount.value.toString();
    });

    const readingTime = computed(() => {
      const wordsPerMinute = 200; // 假设每分钟阅读200个单词
      return Math.ceil(wordCount.value / wordsPerMinute);
    });

    return {
      article,
      loading,
      error,
      wordCount,
      formattedWordCount,
      readingTime,
    };
  },
});
</script>

<template>
  <header class="aheader" v-if="article">
    <Images /> <!-- 使用 Images 组件作为背景 -->
    <div class="ah-content">
      <h1>{{ article.title }}</h1>
      <p v-if="article.publishTime">
        <span class="date">发表于 {{ article.publishTime }}</span> 
        <span class="views">阅读量 {{ article.readcount }}</span> <!-- 使用readcount字段 -->
      </p>
      <p v-if="article.content">
        <span class="word-count">字数统计 {{ formattedWordCount }} 字</span>
        <span class="reading-time">阅读时长 {{ readingTime }} 分钟</span>
        <span class="comments">{{ article.comments }}</span>
      </p>
    </div>
  </header>
  <div v-else-if="loading">
    加载中...
  </div>
  <div v-else-if="error">
    加载失败: {{ error }}
  </div>
  <div v-else>
    没有找到文章
  </div>
  <!-- 波浪 -->
  <Waves />
</template>

<style scoped>
.aheader {
  position: relative; /* 设置为相对定位 */
  top: 0; /* 固定在顶部 */
  left: 0; /* 固定在左侧 */
  width: 100%; /* 宽度占满整个视口 */
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 200px 0; /* 减少 padding-top 的值 */
  background-attachment: fixed; /* 设置背景固定不动 */
  z-index: -9; /* 设置z-index以确保内容在其他元素下方 */
}

.aheader .imgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 确保图片在内容下方 */
}

.ah-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

p {
  font-size: 1em;
  margin-bottom: 10px;
}

.date, .views, .word-count, .reading-time, .comments {
  display: inline-block;
  margin-right: 10px;
}
</style>
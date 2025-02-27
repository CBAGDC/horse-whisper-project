<template>
  <div class="article-list" :class="{ dark: themeStore.isDarkMode }">
    <div v-if="paginatedArticles.length > 0">
      <div>
        <ArticleItem v-for="(article, index) in paginatedArticles" :key="article.id" :item="article" :styleType="index + 1" />
      </div>
    </div>
    <div v-else>
      <p>No articles available.</p>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="fas fa-angle-left"></i>
      </button>
      <span class="page-number" :style="{ backgroundColor: themeStore.isDarkMode? '#333' : '#f9f9f9' }">{{ currentPage }}</span>
      <span class="page-separator">/</span>
      <span class="page-number" :style="{ backgroundColor: themeStore.isDarkMode? '#333' : '#f9f9f9' }">{{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="fas fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleItem from './ArticleItem.vue';
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();

// 定义当前页码
const currentPage = ref(1);
// 定义每页文章数量
const articlesPerPage = ref(8);

// 定义总记录数
const total = ref(0);
// 定义文章列表，保存所有获取到的数据
const allArticles = ref([]);
// 定义当前页的文章列表
const articles = ref([]);

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / articlesPerPage.value));

// 计算当前页的文章列表
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage.value;
  const end = start + articlesPerPage.value;
  // console.log('当前页码:', currentPage.value, '起始索引:', start, '结束索引:', end);
  return allArticles.value.slice(start, end);
});

const fetchArticles = async () => {
  // console.log('请求接口的参数：pageSize', articlesPerPage.value, 'pageNum', currentPage.value);
  try {
    const response = await fetch(`http://cwebcrm.cn:8046/api/v1/notices/article-list?pageSize=${articlesPerPage.value}&pageNum=${currentPage.value}`);
    const data = await response.json();
    if (data.code === '00000') {
      total.value = data.data.total;
      // console.log('更新后的总记录数 total:', total.value);
      // console.log('更新后的总页数 totalPages:', Math.ceil(total.value / articlesPerPage.value));
      if (data.data.list.length > 0) {
        // 将新获取的数据添加到 allArticles 中
        allArticles.value = allArticles.value.concat(data.data.list.map(article => ({
         ...article,
          id: article.id.toString(), // 确保 id 是字符串
          excerpt: article.excerpt || 'No excerpt available', // 添加默认值
          views: article.views || 0, // 添加默认值
          picurl: article.picurl?.replace(/\\\\/g, '/').replace(/\\/g, '/') || 'default-image-url' // 处理反斜杠
        })));
        // 当前页的文章列表为当前页对应的数据
        articles.value = allArticles.value.slice((currentPage.value - 1) * articlesPerPage.value, currentPage.value * articlesPerPage.value);
      }
    } else {
      console.error('请求失败:', data.msg);
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchArticles();
    console.log('下一页请求后 articles:', articles.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchArticles();
    console.log('上一页请求后 articles:', articles.value);
  }
};

onMounted(async () => {
  await fetchArticles();
  themeStore.initializeTheme(); // 初始化主题
  document.body.classList.toggle('dark', themeStore.isDarkMode); // 应用主题
});
</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 50px 0 0 0;
}

.article-list.dark {
  background-color: #1a1a1a;
  color: white;
}

.article-list.dark .pagination button i {
  color: white;
}

.pagination {
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination .page-number {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 5px;
  display: inline-block; /* 确保 span 元素显示为块级元素 */
}

.pagination .page-separator {
  margin: 0 5px;
  font-size: 16px;
  color: #333;
}

.article-list.dark .pagination .page-separator {
  color: white;
}



@media (min-width: 413px) and (max-width: 431px) {
  .article-list {
    padding: 20px 20px 10px 20px; /* 减少顶部和两侧的内边距 */
  }

  .pagination {
    margin: 15px; /* 减少分页部分的外边距 */
  }

  .pagination button {
    padding: 3px 8px; /* 减小按钮的内边距 */
  }

  .pagination .page-number {
    padding: 3px 8px; /* 减小页码的内边距 */
    font-size: 14px; /* 减小字体大小 */
  }

  .pagination .page-separator {
    font-size: 14px; /* 减小分隔符的字体大小 */
  }
}
</style>
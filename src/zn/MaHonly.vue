<template>
  <div class="mh-oncon">
    <div class="mh-oncon-title">
      <i class="far fa-comment-dots"></i>
      <p>文章列表</p>
    </div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">加载失败: {{ error }}</div>
    <div v-else-if="articles.length === 0">没有文章</div>
    <div v-else>
      <div class="search-box">
        <input type="text" v-model="searchQuery" @input="onSearchInput" placeholder="搜索文章标题" />
        <span class="search-icon">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <ul class="gray-rectangle">
        <li v-for="article in filteredArticles" :key="article.id" class="small-rectangle">
          <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="item-text">
            <h2>{{ article.title }}</h2>
          </router-link>
          <p class="item-text">{{ article.publisherName }} - {{ article.publishTime }}</p>
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页</span>
        <button @click="nextPage" :disabled="filteredArticles.length < pageSize">下一页</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 8, // 修改为8
      classid: 1, // 根据需要设置分类ID
      searchQuery: '',
      totalArticles: 0,
    };
  },
  computed: {
    filteredArticles() {
      if (!this.searchQuery) {
        return this.articles.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
      const filtered = this.articles.filter(article => article.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            // classid: this.classid, // 临时移除 classid 参数
          },
        });
        console.log(response.data); // 添加日志
        this.articles = response.data.data.list;
        this.totalArticles = response.data.data.total; // 假设总文章数在 response.data.data.total 中
        console.log('Articles:', this.articles); // 添加日志
      } catch (error) {
        this.error = error.message;
        console.error(error); // 添加日志
      } finally {
        this.loading = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchArticles();
      }
    },
    nextPage() {
      this.currentPage++;
      this.fetchArticles();
    },
    onSearchInput() {
      this.currentPage = 1; // 重置当前页码
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>


<style scoped>
/* 添加一些基本样式 */
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%; 
  /* 修改为100% */
  max-width: 1200px; 
  /* 设置最大宽度 */
  margin: 0 auto;
  justify-content: center; 
  /* 居中对齐 */
}

li {
  /* margin-bottom: 20px; */
  flex: 1  calc(20% - 20px); /* 使用flex布局 */
  /* min-width: 200px;  */
  /* 设置最小宽度 */
  height: 200px; /* 固定高度 */
  margin: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 文字靠左对齐 */
  border: 1px solid #ddd;
  overflow: hidden; /* 隐藏溢出内容 */
  padding: 10px;
}

button {
  /* margin: 10px; */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}

.mh-oncon {
  position: relative;
  z-index: 0;
  background-color: #f0f0f0;
  /* width: 100%; */
  height: 100vh; /* 修改为height */
  /* padding: 20px;  */
  /* 添加内边距 */
  overflow: hidden; /* 防止内容溢出 */
}

.mh-oncon-title {
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center; /* 居中对齐 */
  color: #333;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px; /* 添加底部间距 */
}

.mh-oncon-title i {
  margin-right: 10px; /* 添加间距 */
}

.search-box {
  position: relative;
  width: 100%; /* 修改为100% */
  max-width: 800px; /* 设置最大宽度 */
  margin: 0 auto 20px auto; /* 居中对齐并添加底部间距 */
}

.search-box input[type="text"] {
  padding: 10px 40px 10px 10px; /* 调整内边距 */
  width: 100%;
  border: 2px solid #ddd;
  color: #000000;
  border-radius: 5px;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.item-text {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.small-rectangle a {
  color: #557c83;
  font-size: 20px;
  text-decoration: none;
}

.pagination {
  display: flex;
  justify-content: center; /* 居中对齐 */
  margin-top: 20px;
   /* 添加顶部间距 */
}

.pagination button {
  margin: 0 5px;
}
.pagination span {
  text-align: center;
  line-height:40px ;
  margin: 0 5px;
}

</style>
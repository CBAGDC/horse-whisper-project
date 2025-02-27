import { defineStore } from 'pinia';
import axios from 'axios';

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    searchResults: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchArticles() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list?pageSize=100&pageNum=1');
        this.articles = response.data.data.list;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    searchArticles(keyword) {
      if (!keyword) {
        this.searchResults = this.articles;
      } else {
        this.searchResults = this.articles.filter(article => 
          article.title.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    }
  }
});
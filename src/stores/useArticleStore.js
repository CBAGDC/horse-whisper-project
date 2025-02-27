// src/stores/useArticleStore.js
import { defineStore } from 'pinia';
import { getArticleList } from '../api/api.js';

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    classid: null,
    pageNum: 1,
    pageSize: 10
  }),
  actions: {
    async fetchArticles() {
      try {
        console.log('Fetching articles with classid:', this.classid); // 调试日志
        this.articles = await getArticleList(this.classid, this.pageNum, this.pageSize);
        console.log('Fetched articles:', this.articles); // 调试日志
      } catch (error) {
        console.error('Error fetching articles:', error);
        alert('Failed to fetch articles. Please check the console for more details.');
      }
    }
  }
});
// src/stores/blogStore.ts
import { defineStore } from 'pinia';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogInfo: {
      siteConfig: {
        siteName: '',
      },
    },
  }),
  actions: {
    async fetchBlogInfo() {
      try {
        const response = await fetch('http://cwebcrm.cn:8046/api/v1/notices/article-list'); // 替换为实际的API地址
        const data = await response.json();
        this.blogInfo = data;
      } catch (error) {
        console.error('Failed to fetch blog info:', error);
      }
    },
  },
});
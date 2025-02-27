// store/index.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isBright: true, // 默认亮度设置为亮
    isDarkMode: false
  }),
  actions: {
    toggleBrightness() {
      this.isBright = !this.isBright;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
});

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogInfo: null, // 初始化 blogInfo 为 null
    language: 'en' // 初始化语言为英文
  }),
  actions: {
    async fetchBlogInfo() {
      try {
        const res = await fetch('http://cwebcrm.cn:8046/api/v1/notices/article-list'); // 替换为实际的 API 地址
        const data = await res.json();
        this.blogInfo = data;
      } catch (error) {
        console.error('Failed to fetch blog info:', error);
      }
    },
    toggleLanguage() {
      this.language = this.language === 'en' ? 'zh' : 'en'; // 切换语言
      localStorage.setItem('language', this.language); // 保存到 localStorage
    }
  }
});
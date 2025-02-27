// src/store/blog.ts
import { defineStore } from 'pinia';

interface BlogState {
  blogInfo: {
    siteConfig: {
      isChat: boolean;
      websocketUrl: string;
      touristAvatar: string;
    };
  };
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    blogInfo: {
      siteConfig: {
        isChat: false,
        websocketUrl: '',
        touristAvatar: '',
      },
    },
  }),
  actions: {
    // 其他操作
  },
});
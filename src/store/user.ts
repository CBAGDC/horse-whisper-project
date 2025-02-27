// src/store/user.ts
import { defineStore } from 'pinia';

interface UserState {
  user: {
    id?: number;
    nickname?: string;
    avatar?: string;
  };
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {
      id: undefined,
      nickname: undefined,
      avatar: undefined,
    },
  }),
  actions: {
    // 其他操作
  },
});


// src/store/index.ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { App } from "vue";
import { resetSetupStore } from "./plugins";
import { defineStore } from 'pinia';
import { useUserStore } from "./stores/userStore";

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark', this.isDarkMode);
    },
  },
});

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);
  store.use(piniaPluginPersistedstate);

  // 初始化其他 Pinia store
  const userStore = useUserStore();

  app.use(store);
}

export * from "./modules";
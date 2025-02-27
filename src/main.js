// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import { useThemeStore } from '@/stores/theme';
import i18n from './i18n'; // 确保这里导入的是你之前配置好的 i18n 实例

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(i18n); // 使用创建的 i18n 实例
app.use(pinia);

axios.defaults.baseURL = 'http://cwebcrm.cn:8046/api/v1/notices/2/detail';
app.config.globalProperties.$axios = axios;


app.config.errorHandler = (err, vm, info) => {
  console.error('Global Error Handler:', err, info);
};


app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
});

const themeStore = useThemeStore();

// 添加调试信息
console.log('Initial themeStore state:', themeStore);

const darkModeFromStorage = localStorage.getItem('darkMode');
console.log('darkMode from localStorage:', darkModeFromStorage);
// 添加调试信息
console.log('Initial themeStore state:', themeStore);
console.log('Initial isDarkMode:', themeStore.isDarkMode);
console.log('Initial ahOpdBackgroundColor:', themeStore.ahOpdBackgroundColor);


if (darkModeFromStorage === 'true') {
  themeStore.toggleDarkMode();
}

console.log('Final themeStore state:', themeStore.isDarkMode);

// 条件导入 sanitize-html
if (typeof window === 'undefined') {
  const sanitizeHtml = require('sanitize-html');
  // 在服务器端使用 sanitizeHtml
}

app.mount('#app');
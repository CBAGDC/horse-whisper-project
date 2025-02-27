// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 直接导入已经创建好的 router 实例
import { createI18n } from 'vue-i18n';
import store from './store';
import NextPage from './components/NextPage.vue';

// 定义多语言消息
const messages = {
    en: {
      translation: {
        myPersonalStory: 'My Personal Story',
        ridersStories: 'Riders and their Stories',
        aboutEquestrian: 'About Equestrian',
        aboutHorses: 'About Horses',
        mainHeaderPart1: 'Horse whis',
        mainHeaderPart2: 'per',
        mainHeaderPart3: "Jialiang's Personal",
        mainHeaderPart4: 'Web Page',
        authorName:'Li Jialiang',
        authorDescription1:'Fresh clothes when the young horse, not young line and know',
        authorDescription2:'Share Everyday Learning, Life and Equestrian Knowledge',
 
        articles: 'Articles',
        views: 'Views',
        runtime: 'Runtime',
        nextpage: 'Next Page'

      }
    },
    zh: {
      translation: {
        myPersonalStory: '我的个人故事',
        ridersStories: '骑手和他们的故事',
        aboutEquestrian: '关于马术',
        aboutHorses: '关于马',
        mainHeaderPart1: '马语',
        mainHeaderPart2: '者',
        mainHeaderPart3: "嘉良的个人",
        mainHeaderPart4: '网页',
        authorName:'李嘉良',
        authorDescription1:'鲜衣怒马少年时，不识愁滋味，',
        authorDescription2:'分享每日学习、生活和马术知识。',
     
        articles: '文章',
        views: '浏览',
        runtime: '运行时间',
        nextpage: '下一页'
      }
    }
  };

// 创建 i18n 实例
const i18n = createI18n({
  locale: 'en', // 设置默认语言
  messages,
});

// 创建 Vue 应用实例并挂载所有插件
const app = createApp(App);
app.use(router); // 挂载路由实例
app.use(i18n);   // 挂载国际化插件
app.use(store);
app.mount('#app');
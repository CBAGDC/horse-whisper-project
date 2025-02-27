// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Header from '../en/Header.vue';
import RatStories from '../en/RatStories.vue';
import AHorses from '../en/AHorses.vue';
import MaHorses from '../en/MaHorses.vue';
import AHone from '../en/AHone.vue';
import MaHonly from '../en/MaHonly.vue';
import Raone from '../en/Raone.vue';
import ArticleDetail from '../en/ArticleDetail.vue'; 
import AEquestrian from '../en/AEquestrian.vue';

import zHeader from '../zn/Header.vue';
import zRatStories from '../zn/RatStories.vue';
import zAHorses from '../zn/AHorses.vue';
import zMaHorses from '../zn/MaHorses.vue';
import zAHone from '../zn/AHone.vue';
import zMaHonly from '../zn/MaHonly.vue';
import zRaone from '../zn/Raone.vue';
import zArticleDetail from '../zn/ArticleDetail.vue'; 
import zAEquestrian from '../zn/AEquestrian.vue';

import Home from '../Home/Home.vue';
import EquineArt from '../Home/EquineArt.vue';

const enRoutes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/EquineArt',
    name: 'EquineArt',
    component: EquineArt,
  },
  {
    path: '/',
    name: 'Header',
    component: Header
  },
 
  {
    path: '/MaHorses',
    name: 'MaHorses',
    component: MaHorses
  },
  {
    path: '/RatStories',
    name: 'RatStories',
    component: RatStories
  },
  {
    path: '/AHorses',
    name: 'AHorses',
    component: AHorses
  },
  {
    path: '/AHone',
    name: 'AHone',
    component: AHone
  },
  {
    path: '/MaHonly',
    name: 'MaHonly',
    component: MaHonly
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
  },
  {
    path: '/Raone',
    name: 'Raone',
    component: Raone,
  },
  {
    path: '/AEquestrian',
    name: 'AEquestrian',
    component: AEquestrian
  },  
];


const znRoutes = [
  {
    path: '/zHeader',
    name: 'zHeader',
    component: zHeader
  },
 
  {
    path: '/zMaHorses',
    name: 'zMaHorses',
    component: zMaHorses
  },
  {
    path: '/zRatStories',
    name: 'zRatStories',
    component: zRatStories
  },
  {
    path: '/zAHorses',
    name: 'zAHorses',
    component: zAHorses
  },
  {
    path: '/zAHone',
    name: 'zAHone',
    component: zAHone
  },
  {
    path: '/zMaHonly',
    name: 'zMaHonly',
    component: zMaHonly
  },
{
  path: '/zarticle/:id',
  name: 'zArticleDetail',
  component: zArticleDetail,
},
  {
    path: '/zRaone',
    name: 'zRaone',
    component: zRaone,
  },
  {
    path: '/zAEquestrian',
    name: 'zAEquestrian',
    component: zAEquestrian
  },
  
];

// 先定义 routes
const routes = [...enRoutes, ...znRoutes];

// 然后创建路由器实例
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;


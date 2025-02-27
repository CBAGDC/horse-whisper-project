// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Header from '../en/Header.vue';
import RatStories from '../en/RatStories.vue';
import AEquestrian from '../en/AEquestrian.vue';
import AHorses from '../en/AHorses.vue';
import Login from '../en/Login.vue';
import MaHorses from '../en/MaHorses.vue';





const routes = [
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
    path: '/AEquestrian',
    name: 'AEquestrian',
    component: AEquestrian
  }, 
  {
    path: '/AHorses',
    name: 'AHorses',
    component: AHorses
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
  
  // {
  //   path:'*',
  //   component: ()=>import('@/en/404.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
// router/index.js
router.beforeEach((to, from, next) => {
  // 确保这里没有不必要的逻辑影响跳转
  next();
});

export default router;
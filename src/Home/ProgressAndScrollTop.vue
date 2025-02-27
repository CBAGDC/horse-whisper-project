<template>
  <div class="progress-and-scroll-top" :class="{ visible: progress > 0 || showProgress }">
    <div class="progress-info">
      <button class="scroll-top-button" @click="scrollToTop">
        <div class="arrowhead">↑</div>
        <span class="progress-value">{{ progress }}%</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useProgressStore } from '@/stores/progressStore';
import { computed } from 'vue';

export default {
  props: {
    showProgress: Boolean,
  },
  setup() {
    const progressStore = useProgressStore();

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const progress = computed(() => progressStore.progress);

    console.log('Progress value:', progress.value); // 添加调试日志

    return {
      progress,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
.progress-and-scroll-top {
  position: fixed;
  bottom: 70px;
  right: -50px; /* 初始位置在右侧隐藏 */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: right 0.3s ease-in-out; /* 添加过渡效果 */
}

.progress-and-scroll-top.visible {
  right: 10px; /* 显示时的位置 */
}

.progress-bar::before {
  content: '';
  display: block;
  height: 100%;
  width: 0;
  transition: width 0.3s;
}

.progress-info {
  display: flex;
  align-items: center;
}

.scroll-top-button {
  background-color: #fefefe;
  border: none;
  width: 40px;
  height: 50px;
  border-radius: 5%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05),
   0 -4px 8px rgba(0, 0, 0, 0.05),
    4px 0 8px rgba(0, 0, 0, 0.05),
     -4px 0 8px rgba(0, 0, 0, 0.05); /* 四周阴影 */
  cursor: pointer;
}

.arrowhead {
  margin: 5px auto;
  color: #ee788b; /* 初始颜色 */
  transition: color 0.2s ease-in-out; /* 添加过渡效果 */
}

.progress-value {
  font-size: 14px;
  margin: 5px auto;
  color: #ee788b; /* 初始颜色 */
  transition: color 0.2s ease-in-out; /* 添加过渡效果 */
}

.scroll-top-button:hover .arrowhead {
  color: #ff2e4d; /* 悬停时的颜色 */
}

.scroll-top-button:hover .progress-value {
    color: #ff2e4d; /* 悬停时的颜色 */
}
</style>
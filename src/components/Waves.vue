<template>
  <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28"
    preserveAspectRatio="none" shape-rendering="auto" :class="{ dark: darkMode.isDarkMode }">
    <!--形状容器-->
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
    </defs>
    <!--组合波浪-->
    <g class="parallax">
      <use class="use" xlink:href="#gentle-wave" x="48" y="0" :fill="waveColors[0]"></use>
      <use class="use" xlink:href="#gentle-wave" x="48" y="3" :fill="waveColors[1]"></use>
      <use class="use" xlink:href="#gentle-wave" x="48" y="5" :fill="waveColors[2]"></use>
      <use class="use" xlink:href="#gentle-wave" x="48" y="7" :fill="waveColors[3]"></use>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '@/stores/darkMode';
import { useThemeStore } from '@/stores/theme';
import { onMounted, computed } from 'vue';

const darkMode = useDarkModeStore();
const theme = useThemeStore();

const initialWaveColors = [
  'rgba(255, 255, 255, 0.4)',
  'rgba(255, 255, 255, 0.6)',
  'rgba(255, 255, 255, 0.8)',
  'rgba(255, 255, 255, 1)'
];

onMounted(() => {
  // 设置初始颜色
  theme.setInitialWaveColors(initialWaveColors);
});

const waveColors = computed(() => theme.waveColors);
</script>

<script lang="ts">
export default {
  name: "Waves"
};
</script>

<style lang="scss" scoped>
.waves {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 12vh;
  min-height: 3.125rem;
  max-height: 9.375rem;
  z-index: 5;
}

.parallax {
  .use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;

    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }

    &:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }

    &:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }

    &:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
}

/* 波浪动画 */
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

@media (max-width: 768px) {
  .waves {
    height: 15px;
    min-height: 15vh;
  }
}
</style>
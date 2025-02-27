// src/stores/theme.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false, // 默认为非暗模式
    waveColors: [], // 移除默认值
    containerBackgroundColor: '#f0f0f0', // 默认亮色模式下的背景颜色
    ahOpdBackgroundColor: '#f0f0f0', // 默认亮色模式下的背景颜色
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode.toString());
      this.updateWaveColors();
      this.updateContainerBackgroundColor();
      this.updateAhOpdBackgroundColor();
    },
    initializeTheme() {
      const darkModeFromStorage = localStorage.getItem('darkMode');
      if (darkModeFromStorage !== null) {
        this.isDarkMode = darkModeFromStorage === 'true';
      } else {
        this.isDarkMode = false; // 默认为非暗模式
      }
      this.updateWaveColors();
      this.updateContainerBackgroundColor();
      this.updateAhOpdBackgroundColor();
    },
    updateWaveColors() {
      if (this.isDarkMode) {
        this.waveColors = [
          'rgba(35, 35, 35, 0.4)',
          'rgba(35, 35, 35, 0.6)',
          'rgba(37, 37, 37, 0.8)',
          'rgba(18, 18, 18, 0.9)'
        ];
      } else {
        this.waveColors = [
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 1)'
        ];
      }
      localStorage.setItem('waveColors', JSON.stringify(this.waveColors));
    },
    setInitialWaveColors(colors) {
      // 假设 colors 是一个数组，根据亮度调整颜色
      this.waveColors = colors.map((color, index) => {
        // 这里可以根据亮度调整颜色，这里简单地使用传入的颜色
        return color;
      });
      localStorage.setItem('waveColors', JSON.stringify(this.waveColors));
    },
    updateContainerBackgroundColor() {
      this.containerBackgroundColor = this.isDarkMode ? '#111' : '#f0f0f0'; // 根据主题模式设置背景颜色
      localStorage.setItem('containerBackgroundColor', this.containerBackgroundColor);
    },
    updateAhOpdBackgroundColor() {
      this.ahOpdBackgroundColor = this.isDarkMode ? '#000' : '#ffffff'; // 根据主题模式设置背景颜色
      localStorage.setItem('ahOpdBackgroundColor', this.ahOpdBackgroundColor);
    },
  },
  getters: {
    isBright: (state) => !state.isDarkMode, // 通过 isDarkMode 推导 isBright
    getContainerBackgroundColor: (state) => state.containerBackgroundColor, // 提供获取背景颜色的方法
    getAhOpdBackgroundColor: (state) => state.ahOpdBackgroundColor, // 提供获取背景颜色的方法
  },
});
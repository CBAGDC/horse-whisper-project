// src/stores/progressStore.js
import { defineStore } from 'pinia';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: 0,
    showProgress: false,
  }),
  actions: {
    updateProgress(value) {
      this.progress = value;
      console.log('Progress updated to:', this.progress);
    },
    setShowProgress(value) {
      this.showProgress = value;
      console.log('ShowProgress updated to:', this.showProgress);
    }
  }
});
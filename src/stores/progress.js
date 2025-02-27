import { defineStore } from 'pinia';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progress: 0,
    showProgress: false,
  }),
  actions: {
    updateProgress(newProgress) {
      this.progress = newProgress;
    },
    setShowProgress(show) {
      this.showProgress = show;
    },
  },
});
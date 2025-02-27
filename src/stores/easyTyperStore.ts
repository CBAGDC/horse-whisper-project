// src/stores/easyTyperStore.ts
import { defineStore } from 'pinia';
import EasyTyper, { EasyTyper as EasyTyperClass } from 'easy-typer-js';

interface EasyTyperState {
  instance: EasyTyperClass | null;
}

export const useEasyTyperStore = defineStore('easyTyper', {
  state: (): EasyTyperState => ({
    instance: null,
  }),
  actions: {
    init(obj: any, text: string, onStart?: () => void, onComplete?: () => void) {
      if (this.instance) {
        this.instance.destroy(); // 销毁之前的实例（如果存在）
      }
      this.instance = new EasyTyperClass(obj, text, onStart, onComplete);
    },
    destroy() {
      if (this.instance) {
        this.instance.destroy();
        this.instance = null;
      }
    },
  },
});
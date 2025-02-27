// src/stores/useMainStore.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        // 定义状态
        message: 'Thanks for watching',
        agencyInfo: 'We are boxy, an innovative, client-first agency. We have worked with the likes of Droplet and Blimp. Our team has over 100 years of collective experience in 3D marketing and branding.'
    }),
    actions: {
        // 定义操作方法
        updateMessage(newMessage) {
            this.message = newMessage;
        }
    }
});
// src/stores/visitStatsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useVisitStatsStore = defineStore('visitStats', () => {
  const stats = ref([]);
  const title = ref('Visit Statistics');

  const fetchVisitStats = async () => {
    try {
      const response = await axios.get('http://cwebcrm.cn:8046/api/v1/logs/visit-stats');
      console.log('Response data:', response.data); // 添加日志
      if (response.data.code === '00000' && response.data.data) {
        // 将对象转换为数组
        stats.value = [
          {
            type: 'UV 访问量（独立访客访问数）',
            todayCount: response.data.data.todayUvCount,
            totalCount: response.data.data.totalUvCount,
            growthRate: (response.data.data.uvGrowthRate * 100).toFixed(2),
            granularityLabel: '每日 UV'
          },
          {
            type: 'PV 访问量（点击量）',
            todayCount: response.data.data.todayPvCount,
            totalCount: response.data.data.totalPvCount,
            growthRate: (response.data.data.pvGrowthRate * 100).toFixed(2),
            granularityLabel: '每日 PV'
          }
          // 可以根据需要添加其他统计项
        ];
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching visit stats:', error);
    }
  };

  return { stats, title, fetchVisitStats };
});
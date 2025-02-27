// carouselStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCarouselStore = defineStore('carousel', () => {
  const carouselList = ref<{ id: string, imgUrl: string }[]>([]);

const getCarouselList = async () => {
  try {
    // console.log('Fetching carousel list...');
    const response = await fetch('http://cwebcrm.cn:8046/api/v1/notices/article-list?classid=9');
    // console.log('Response received:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log('Data received:', JSON.stringify(data, null, 2));
    if (data.code === '00000' && Array.isArray(data.data.list)) {
      const newList = data.data.list.map((item: { id: any; picurl: string; }) => ({
        id: item.id,
        imgUrl: item.picurl.replace(/\\/g, '/')
      }));
      // console.log('New carousel list:', newList);
      carouselList.value = newList;
      // console.log('carouselList set:', carouselList.value);
    } else {
      console.error('Failed to fetch carousel list:', data.msg || 'Invalid response format');
      carouselList.value = []; // 设置默认空数组
    }
  } catch (error) {
    console.error('Failed to fetch carousel list:', error);
    carouselList.value = []; // 设置默认空数组
  }
};
  return { carouselList, getCarouselList };
});
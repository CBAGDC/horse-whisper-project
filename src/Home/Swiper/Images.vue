<template>
  <div class="imgs" ref="imgsContainer">
    <ul>
      <li
        class="item"
        v-for="(carousel, index) in carouselList"
        :key="carousel.id"
        :style="{
          'background-image': `url(${carousel.imgUrl})`,
          'animation-delay': `${calculateDelay(index, carouselList.length)}s`
        }"
      >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed, toRefs } from 'vue';
import { useCarouselStore } from '@/stores/carouselStore';

const carouselStore = useCarouselStore();
const { carouselList } = toRefs(carouselStore); // 使用 toRefs 确保是响应式引用
const imgsContainer = ref<HTMLElement | null>(null);

// 预加载图片
const preloadImages = (images: string[]): Promise<void[]> => {
    const promises: Promise<void>[] = [];
    let loadedCount = 0;
    images.forEach((url) => {
        const img = new Image();
        img.src = url;
        const promise = new Promise<void>((resolve, reject) => {
            img.onload = () => {
                loadedCount++;
                // console.log(`Image loaded: ${url}, progress: ${loadedCount}/${images.length}`);
                resolve();
            };
            img.onerror = (error) => {
                console.error(`Failed to load image: ${url}. Check the image URL.`, error);
                reject(error);
            };
        });
        promises.push(promise);
    });
    return Promise.all(promises);
};

// 计算每个图片的 animation-delay
const calculateDelay = (index: number, totalItems: number) => {
    const animationDuration = 36; // 总动画时长
    const delayPerItem = animationDuration / totalItems;
    return index * delayPerItem;
};

// 获取轮播图列表
onMounted(() => {
    carouselStore.getCarouselList().then(() => {
        // console.log('Received response:', carouselList.value); 
        // 预加载图片并等待完成
        preloadImages(carouselList.value.map(carousel => carousel.imgUrl)).then(() => {
            // 预加载完成后重置动画状态
            resetAnimations();
        }).catch((error) => {
            console.error('Failed to preload images:', error);
        });
    }).catch((error) => {
        console.error('Failed to fetch carousel list:', error);
    });
});

// 监听 carouselList 变化并重置动画
watch(
  carouselList, 
  (newList) => {
    // console.log('Updated carousel list:', newList);
    // 预加载图片并等待完成
    preloadImages(newList.map(carousel => carousel.imgUrl)).then(() => {
        // 预加载完成后重置动画状态
        resetAnimations();
    }).catch((error) => {
        console.error('Failed to preload images:', error);
    })
});
// 重置动画状态
const resetAnimations = () => {
    if (imgsContainer.value) {
        imgsContainer.value.style.animation = 'none';
        void imgsContainer.value.offsetWidth; // 强制重绘
        imgsContainer.value.style.animation = '';
    }
};
</script>

<style lang="scss" scoped>
.imgs {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  z-index: 4;
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50% / cover;
  opacity: 0;
  animation: imageAnimation 24s linear infinite;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}


.imgs::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0,.2);
  transition: all .2s ease-in-out 0s;
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    transform: scale(1);
  }

  2% {
    opacity: 1;
  }

  25% {
    opacity: 1;
    transform: scale(1.1);
  }

  48% {
    opacity: 1;
    transform: scale(1.2);
  }

  50% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
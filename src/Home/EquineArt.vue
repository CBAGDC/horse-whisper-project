<template>
    <div class="app-container">
      <div class="image-container">
        <transition name="slide-left">
          <img
            v-if="getPreviousImage()"
            :src="getPreviousImage().picurl"
            class="side-image left"
            :key="getPreviousImageKey()"
            :class="{ active: currentIndex === 1 }"
          />
        </transition>
        <transition name="slide-center">
          <img
            v-if="data.list[currentIndex]"
            :src="data.list[currentIndex].picurl"
            class="center-image"
            :class="{ active: true }"
            ref="centerImage"
            :key="currentIndex"
          />
        </transition>
        <transition name="slide-right">
          <img
            v-if="getNextImage()"
            :src="getNextImage().picurl"
            class="side-image right"
            :class="{ active: currentIndex === data.list.length - 2 }"
            :key="getNextImageKey()"
          />
        </transition>
      </div>
      <div class="button-container">
        <button @click="prevPage" class="EAbutton">
          <img src="../assets/image/下一页.png" alt="" class="img1"></button>
        <button @click="toggleFullScreen" class="custom-button fullscreen-button">放大至全屏</button>
        <button @click="nextPage" class="EAbutton">
          <img src="../assets/image/下一页.png" alt="" class="img2"></button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const data = ref({ list: [], total: 0 });
      const currentIndex = ref(0);
      const centerImage = ref(null);
      const transitioning = ref(false);
  
      const fetchData = async () => {
        try {
          const response = await axios.get('http://cwebcrm.cn:8046/api/v1/notices/article-list?classid=10');
          data.value = response.data.data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      const getPreviousImage = () => {
        if (data.value.list.length === 0) return null;
        let index = currentIndex.value - 1;
        if (index < 0) {
          index = data.value.list.length - 1;
        }
        return data.value.list[index];
      };
  
      const getPreviousImageKey = () => {
        if (data.value.list.length === 0) return null;
        let index = currentIndex.value - 1;
        if (index < 0) {
          index = data.value.list.length - 1;
        }
        return index;
      };
  
      const getNextImage = () => {
        if (data.value.list.length === 0) return null;
        let index = currentIndex.value + 1;
        if (index >= data.value.list.length) {
          index = 0;
        }
        return data.value.list[index];
      };
  
      const getNextImageKey = () => {
        if (data.value.list.length === 0) return null;
        let index = currentIndex.value + 1;
        if (index >= data.value.list.length) {
          index = 0;
        }
        return index;
      };
  
      const prevPage = async () => {
        if (!transitioning.value) {
          transitioning.value = true;
          currentIndex.value--;
          if (currentIndex.value < 0) {
            currentIndex.value = data.value.list.length - 1;
          }
          await new Promise(resolve => setTimeout(resolve, 300));
          transitioning.value = false;
        }
      };
  
      const nextPage = async () => {
        if (!transitioning.value) {
          transitioning.value = true;
          currentIndex.value++;
          if (currentIndex.value >= data.value.list.length) {
            currentIndex.value = 0;
          }
          await new Promise(resolve => setTimeout(resolve, 300));
          transitioning.value = false;
        }
      };
  
      const toggleFullScreen = () => {
        if (centerImage.value.requestFullscreen) {
          centerImage.value.requestFullscreen();
        } else if (centerImage.value.mozRequestFullScreen) { // Firefox
          centerImage.value.mozRequestFullScreen();
        } else if (centerImage.value.webkitRequestFullscreen) { // Chrome, Safari and Opera
          centerImage.value.webkitRequestFullscreen();
        } else if (centerImage.value.msRequestFullscreen) { // IE/Edge
          centerImage.value.msRequestFullscreen();
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        data,
        currentIndex,
        prevPage,
        nextPage,
        toggleFullScreen,
        centerImage,
        transitioning,
        getPreviousImage,
        getNextImage,
        getPreviousImageKey,
        getNextImageKey
      };
    }
  };
  </script>
  
  <style>
  /* 新增：固定页面高度并隐藏滚动条 */
  .app-container {
    min-height: 100vh;
    overflow: hidden;
    background-color: #f0f0f0;
  }
  
  .image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .center-image {
    width: 900px;
    height: 550px;
    z-index: 2;
    position: absolute;
    top: 50px;
  }
  
  .side-image {
    width: 500px;
    height: 450px;
    position: absolute;
    top: 100px;
    z-index: 1;
  }
  
  .left {
    left: 0;
    filter: blur(3px);
  }
  
  .right {
    right: 0;
    filter: blur(3px);
  }
  
  .button-container {
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }
  
  /* 按钮通用样式 */
  .custom-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  /* 上一页按钮样式 */
  .prev-button {
    background-color: #3e8fe5;
    color: white;
  }
  
  .prev-button:hover {
    background-color: #4880bc;
    transform: translateY(-2px);
  }
  
  /* 放大至全屏按钮样式 */
  .fullscreen-button {
    background-color: #8bcf56;
    color: white;
  }
  
  .fullscreen-button:hover {
    background-color: #60aa43;
    transform: translateY(-2px);
  }
  
  /* 下一页按钮样式 */
  .next-button {
    background-color: #d34856;
    color: white;
  }
  
  .next-button:hover {
    background-color: #9a3f48;
    transform: translateY(-2px);
  }
  
  /* 过渡动画样式 */
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-center-enter-active,
  .slide-center-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-left-enter-from,
  .slide-left-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    filter: blur(3px);
  }
  
  .slide-left-enter-to,
  .slide-left-leave-from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(3px);
  }
  
  .slide-right-enter-from,
  .slide-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
    filter: blur(3px);
  }
  
  .slide-right-enter-to,
  .slide-right-leave-from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(3px);
  }
  
  .slide-center-enter-from,
  .slide-center-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
  
  .slide-center-enter-to,
  .slide-center-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  
  /* 分页按钮样式 */
  .EAbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    width: 75px;
    height: 75px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid #848484;
  }
  
  .EAbutton:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .EAbutton .img1 {
    padding: 5px 12px 25px 10px;
    width: 50px;
    height: 50px;
    transform: rotate(90deg);
  }
  
  .EAbutton .img2 {
    padding: 5px 12px 25px 10px;
    width: 50px;
    height: 50px;
    transform: rotate(-90deg);
  }



  /* 新增或修改的媒体查询 */
@media (min-width: 414px) {
  .app-container {
    padding: 0 50px; 
  }

  .image-container {
    flex-direction: column;
    align-items: center;
  }

  .center-image {
    width: 80%; /* 减小中心图片的宽度 */
    height: auto; /* 保持图片比例 */
    top: 100px; /* 调整顶部位置 */
  }

  .side-image {
    width: 60%; /* 进一步减小侧边图片的宽度 */
    height: auto; /* 保持图片比例 */
    top: unset; /* 移除顶部固定位置 */
    margin: 10px 0; /* 增加上下外边距 */
  }



}
  </style>
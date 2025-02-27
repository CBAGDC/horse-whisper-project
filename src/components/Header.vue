<template>
  <div class="container">
    <LeftSection />
    <RightSection />
  </div>
</template>

<script>
import LeftSection from './LeftSection.vue';
import RightSection from './RightSection.vue';

export default {
  components: {
    LeftSection,
    RightSection
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}

/* 引入得意黑字体 */
@font-face {
  font-family: 'DeYiHei';
  src: url('../fonts/SmileySans-Oblique.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('../fonts/Inter-Medium.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SiYuanHeiTiB';
  src: url('../fonts/SourceHanSansSC-Bold.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SiYuanHeiTiR';
  src: url('../fonts/SourceHanSansSC-Regular.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}

/* 整体容器样式，设置宽度等基本属性，并让内部元素可以横向排列 */
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
}

/* 左边白色区域样式 */
.left-section {
  z-index: 0;
  flex: 0 40%;
  background-color: white;
  padding: 200px;
  border-radius: 16px;
  background: rgba(238, 238, 238, 1);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
}

/* 右边黑色区域样式 */
.right-section {
  z-index: 0;
  flex: 0 60%;
  background-color: black;
  padding: 250px 250px 250px 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

/* 媒体查询，针对不同屏幕尺寸调整样式 */
@media (max-width: 1400px) {
  .left-section, .right-section {
    flex: 0 0 50%;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .left-section, .right-section {
    flex: none;
    width: 100%;
  }
  .navbar {
    position: static;
    display: flex;
    justify-content: space-around;
  }
}
</style>
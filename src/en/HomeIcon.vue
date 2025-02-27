<!-- HomeIcon.vue -->
<template>
  <div class="home-icon">
    <router-link to="/">
      <img src="../assets/icons/首页.svg" alt="首页图标">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeIcon'
};
</script>

<style scoped>
.home-icon {
  position: absolute;
  top: 25px; /* 根据需求调整距离顶部的距离，这里示例设为20px */
  left: 15px; /* 根据需求调整距离左侧的距离，这里示例设为20px */
  z-index: 999; /* 设置较高的层级，让它浮在其他元素之上 */
}

.home-icon img {
  width: 30px; /* 根据图标大小调整宽度，示例设为30px */
  height: 30px; /* 根据图标大小调整高度，示例设为30px */
}
</style>
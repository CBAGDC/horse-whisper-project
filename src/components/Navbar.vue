<template>
  <nav class="navbar">
    <ul>
      <li><a href="./MPStory.vue">My Personal Story</a></li>
      <li><a href="./RatStories.vue">Riders and their Stories</a></li>
      <li><a href="./AEquestrian.vue">About Equestrian</a></li>
      <li><a href="./AHorses.vue">About Horses</a></li>
      <!-- 添加用于翻译图标的li元素 -->
      <li class="icon-item">
        <img src="../icon/翻译.svg" alt="翻译图标">
      </li>
      <!-- 添加用于亮度图标的li元素 -->
      <li class="icon-item">
        <img src="../icon/亮度.svg" alt="亮度图标">
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: absolute;
  top: 45px;
  right: 50px;
  z-index: 1;
}

.navbar ul {
  padding: 0;
  margin: 0;
  display: flex;
}

.navbar ul li {
  list-style: none;
  opacity: 1;
  border-radius: 15px;
  background: rgba(105, 105, 105, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}

.navbar ul li a {
  width: 100%;
  height: 20px;
  opacity: 1;
  font-family: 'DeYiHei';
  font-size: 16px;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
  text-decoration: none;
  font-weight: 100;
}

.navbar ul li.icon-item {
  padding-left: 20px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  margin-right: -10px;
}

.navbar ul li.icon-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
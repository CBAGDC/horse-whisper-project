<template>
  <div class="home-page">
    <!-- 关于马语者 -->
    <section class="module about-whisperer">
      <h2>关于马语者</h2>
      <p>马语者创建故事和创始人的故事...</p>
    </section>

    <!-- 马的故事 -->
    <section class="module horse-stories">
      <h2>马的故事</h2>
      <p>马场现状，马的情况之类的...</p>
      <div class="video-container">
        <video controls>
          <source src="path-to-your-video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </section>

    <!-- 人与马的故事 -->
    <section class="module human-horse-stories">
      <h2>人与马的故事</h2>
      <p>包含嘉良的故事和未来其他人的故事...</p>
      <div class="video-container">
        <video controls>
          <source src="path-to-your-video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr';

export default {
  name: 'AEquestrian',
  components: {
    VuePlyr
  },
  data() {
    return {
      // 如果有需要绑定的数据，可以在这里定义
    };
  }
};
</script>


<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.module {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.module h2 {
  margin-top: 0;
  font-size: 1.5em;
}

.module p {
  margin: 10px 0 0;
}

.video-container {
  margin-top: 20px;
}

.video-container video {
  width: 100%;
  max-width: 800px;
  height: auto;
}
</style> 
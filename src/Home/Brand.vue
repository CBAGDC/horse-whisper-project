<template>
  <div ref="brandRef" class="brand-container">
    <div class="brand">
      <!-- 标题 -->
      <p class="artboard" v-if="blog.blogInfo && blog.blogInfo.siteConfig">
        {{ blog.blogInfo.siteConfig.siteName }}
      </p>
      <!-- 打字机 -->
      <div class="title">
        {{ obj.output }}
        <span class="easy-typed-cursor">|</span>
      </div>
    </div>
    <!-- 波浪 -->
    <Waves />
    <!-- 向下按钮 -->
    <SvgIcon class="arrow-down" icon-class="down" size="32px" @click="scrollDown" />
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "@/stores/blogStore"; // 修改为新的 Pinia store 路径
import EasyTyper from "easy-typer-js";
import { ref, reactive, onMounted, nextTick } from "vue";
import Waves from "@/components/Waves.vue";
import SvgIcon from "@/components/SvgIcon.vue"; // 使用默认导入

const blog = useBlogStore();
const obj = reactive({
  output: "",
  isEnd: false,
  speed: 100,
  singleBack: false,
  sleep: 0,
  type: "normal",
  backSpeed: 100,
  sentencePause: false,
});

const brandRef = ref<HTMLElement>();

const scrollDown = () => {
  nextTick(() => {
    window.scrollTo({
      behavior: "smooth",
      top: brandRef.value?.clientHeight || 0,
    });
  });
};

const fetchData = async () => {
  try {
    const res = await fetch("https://v1.hitokoto.cn");
    const data = await res.json();
    const hitokoto = data.hitokoto;
    new EasyTyper(obj, hitokoto, () => {}, () => {});
  } catch (error) {
    console.error("Failed to fetch hitokoto:", error);
  }
};

onMounted(() => {
  blog.fetchBlogInfo(); // 使用 Pinia store 的 action
  fetchData();
});
</script>

<style lang="scss" scoped>
.brand-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 62vh; /* 调整品牌部分的高度 */
  min-height: 10rem;
  // color: white;
  background-color: transparent; /* 设置背景色为透明 */
  z-index: 5;
}

.brand {
  flex-direction: column;
  position: relative; // 修改为 relative，避免 z-index 为负数导致内容被遮挡
  z-index: 1; // 设置合适的 z-index

  .artboard {
    font-family: "Fredericka the Great", Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 3.5em;
    line-height: 1.2;
    animation: titleScale 1s;
  }

  .title {
    letter-spacing: 0.1em;
    color: white;
  }
}

.easy-typed-cursor {
  margin-left: 0.625rem;
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
  color: white; // 确保打字机光标也是白色
}

.arrow-down {
  position: absolute;
  bottom: 70px;
  -webkit-animation: arrow-shake 1.5s ease-out infinite;
  animation: arrow-shake 1.5s ease-out infinite;
  cursor: pointer;
  z-index: 8;
  color: white; // 确保向下按钮的图标也是白色
}

@media (max-width: 767px) {
  .brand-container {
    padding: 3rem 0.5rem 0;
  }
}

@media (min-width: 760px) {
  .title {
    font-size: 1.5rem;
  }
}

@keyframes arrow-shake {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  30% {
    opacity: 0.5;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
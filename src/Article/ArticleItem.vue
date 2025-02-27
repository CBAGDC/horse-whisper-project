<template>
  <div class="article-item-container">
    <div class="article-item" :class="{'reversed': styleType % 2 === 0, 'top-left-date': (styleType - 1) % 3 === 1}">
      <router-link :to="`/article/${item?.id}`" class="article-link">
        <div class="image-container">
          <img :src="item.picurl || 'default-image-url'" alt="Article Image" class="article-image" />
        </div>
        <div class="article-content">
          <div class="content-header">
            <h3 class="article-title">{{ item.title }}</h3>
            <span class="article-date">{{ formattedDate(item.publishTime) }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <button 
      @click="handleMoreClick(item?.id)" 
      class="more-button" 
      :class="{'left-bottom': styleType % 2 === 0}"
    >
      more...
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<{
        id: string;
        picurl: string | null;
        title: string;
        excerpt: string;
        publishTime: string;
        views: number;
      }>,
      required: true,
      default: () => ({
        id: '',
        picurl: 'default-image-url',
        title: 'No title available',
        excerpt: 'No excerpt available',
        publishTime: 'No date available',
        views: 0,
      }),
    },
    styleType: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  methods: {
    handleMoreClick(id: string | undefined) {
      if (id !== undefined) {
        this.$router.push(`/article/${id}`);
      }
    },
    formattedDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // 仅显示日期部分
    },
  },
});
</script>

<style scoped>
:root {
  --background-color: white; /* 默认背景色为白色 */
  --text-color: #000; /* 默认文本颜色 */
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff; /* 深色模式下的文本颜色 */
  }
}

.article-item-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px; /* 设置最大宽度 */
  position: relative; /* 添加相对定位 */
}

.article-item {
  position: relative;
  display: flex;
  align-items: flex-start; /* 修改为从顶部对齐 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* 仅保留下方阴影 */
  border-radius: 15px; 
  margin-bottom: 30px;
  background-color: var(--background-color); /* 使用背景色变量 */
  width: 100%; 
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
  overflow: hidden; /* 添加此行以隐藏图片超出部分 */
}
.article-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02), /* 下方阴影 */
              0 -10px 16px rgba(0, 0, 0, 0.05), /* 上方阴影 */
              8px 0 16px rgba(0, 0, 0, 0.03), /* 右侧阴影 */
              -8px 0 16px rgba(0, 0, 0, 0.03); /* 左侧阴影 */
}

.article-link {
  display: flex;
  flex-direction: row; /* 修改为水平布局 */
  align-items: flex-start; /* 修改为从左侧对齐 */
  text-decoration: none;
  color: inherit;
  width: 100%; /* 确保链接占据剩余空间 */
}

.article-content {
  position: relative;
  z-index: 1; /* 确保内容在图片上方 */
  width: 800px;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 使内容在垂直方向上分布 */
 
}

.image-container {
  overflow: hidden;
  width: 300px;
  height: 230px;
}

.article-image {
  width: 350px;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-item:hover .article-image {
  transform:scale(1.15) skewX(-3deg) ; /* 增加倾斜角度和放大效果 */
}

.content-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 450px;
  height: 230px;
}

.content-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  right: -65px;
  bottom: 0;
  background-color: rgb(240, 240, 240); /* 设置背景颜色 */
  transform: skewX(-5deg);
  transform-origin: left;
  z-index: 3; /* 确保背景在文字下方 */
}

.article-title {
  font-size: 20px;
  margin-top: 30px; /* 添加上边距 */
  margin-bottom: 8px;
  color: #557c83; /* 使用文本颜色变量 */
  padding: 40px; 
  z-index: 5;
}

.article-date {
  color: #999999; /* 将时间颜色改为红色 */
  font-size: 14px;
  padding: 30px 0; 
  z-index: 5;
}

.more-button {
  position: absolute;
  right: 0; /* 调整为负值以超出容器 */
  bottom: 30px; /* 调整为负值以超出容器 */
  background: linear-gradient(to left, #6d9ca5, #649198,#4e7279); /* 设置渐变背景颜色 */
  color: white;
  padding: 15px 25px;
  font-size: 16px;
  border-radius: 15px 0 15px 0; 
  margin-left: auto;
  z-index: 2; /* 确保按钮在背景框之上 */
  transition: transform 0.3s ease; /* 添加过渡效果 */
  border: none; /* 去掉黑色边框 */
}

.more-button:hover {
  transform: translate(5px, 3px); /* 鼠标悬停时向右下侧移动 */
}

.article-item.reversed .article-link {
  flex-direction: row-reverse; /* 修改为水平布局，反转顺序 */
}


.article-item.reversed .article-image {
  transition: transform 0.5s ease;
}

.article-item.reversed:hover .article-image {
  transform: scale(1.15) skewX(-3deg); /* 增加倾斜角度和放大效果 */
}

.article-item.reversed .article-content {
  padding-right: 20px; /* 调整内边距 */
}
.more-button.left-bottom {
  right: auto; /* 取消之前的 right 定位 */
  left: 0; /* 设置为左对齐 */
  bottom: 30px; /* 保持底部定位 */
  border-radius: 0 15px 0 15px; 

}
.more-button.left-bottom:hover {
  transform: translate(-5px, 3px); /* 鼠标悬停时向右下侧移动 */
}

@media (min-width: 413px) and (max-width: 431px) {
  .article-item-container {
    max-width: 100%; /* 确保容器宽度不超过屏幕宽度 */
  }
  .article-image {
    width: 100%; /* 图片宽度占满整个容器 */
  }

  .content-header {
    width: 80%;
  }
}


</style>
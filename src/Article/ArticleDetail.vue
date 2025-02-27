<template>
    <!-- 文章头部 -->
    <ArticleHeard></ArticleHeard>
    <!-- 文章内容 -->
    <Articles></Articles>
</template>

<script>
// 导入所有需要的组件
import ArticleHeard from '../Article/ArticleHeard.vue';

import Articles from '../Article/Articles.vue';

export default {
  // 注册组件
  components: {
    ArticleHeard,
    Articles
  }
}
</script>

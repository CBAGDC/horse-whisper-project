<!-- SearchPage.vue -->
<template>
  <div class="search-container">
    <input v-model="query" type="text" placeholder="搜索标题关键字" @keyup.enter="performSearch" />
    <button @click="performSearch">搜索</button>
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id">{{ result.title }}</li>
    </ul>
    <p v-else-if="query && !results.length">没有找到相关结果</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = ref('');
const results = ref([]);

const performSearch = () => {
  // 假设有一个API来获取搜索结果
  fetch(`/api/search?query=${query.value}`)
    .then(response => response.json())
    .then(data => {
      results.value = data;
    });
};
</script>

<style scoped>
.search-container {
  padding: 20px;
}

input {
  padding: 10px;
  margin-right: 10px;
  width: 300px;
}

button {
  padding: 10px 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
<!-- SearchModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <input v-model="query" type="text" placeholder="搜索标题关键字" @keyup.enter="performSearch" />
      <button @click="performSearch">搜索</button>
      <ul v-if="results.length">
        <li v-for="result in results" :key="result.id">{{ result.title }}</li>
      </ul>
      <p v-else-if="query && !results.length">没有找到相关结果</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const query = ref('');
const results = ref([]);

const closeModal = () => {
  emit('close');
};

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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  padding: 10px;
  margin-right: 10px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  width: 100%;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
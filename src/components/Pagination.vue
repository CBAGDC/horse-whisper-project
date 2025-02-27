<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="current === 1">上一页</button>
    <span>{{ current }} / {{ total }}</span>
    <button @click="nextPage" :disabled="current === total">下一页</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  current: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const prevPage = () => {
  if (props.current > 1) {
    emit("change", props.current - 1);
  }
};

const nextPage = () => {
  if (props.current < props.total) {
    emit("change", props.current + 1);
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    cursor: pointer;

    &:disabled {
      background-color: var(--color-disabled);
      cursor: not-allowed;
    }
  }

  span {
    font-size: 0.9rem;
    color: var(--color-text);
  }
}
</style>
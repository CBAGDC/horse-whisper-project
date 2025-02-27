<template>
  <svg aria-hidden="true" class="svg-icon" :width="size" :height="size">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String as PropType<string>,
      default: 'SvgIcon'
    },
    iconClass: {
      type: String as PropType<string>,
      required: false
    },
    color: {
      type: String as PropType<string>,
      default: 'currentColor'
    },
    size: {
      type: String as PropType<string>,
      default: '1rem'
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
    return {
      symbolId
    };
  }
});
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
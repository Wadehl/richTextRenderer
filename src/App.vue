<script setup lang="ts">
// components
import richTextEditor from './components/richTextEditor.vue';
import richTextRenderer from './components/richTextRenderer.vue';

import { ref } from 'vue';

const text = ref('');
</script>

<template>
  <a-card title="测试：">
    <rich-text-editor v-model="text" />
  </a-card>
  <a-card title="渲染效果：">
    <div style="width: 80vw; margin: 10px auto">
      <rich-text-renderer :rich-text="text" />
    </div>
  </a-card>
</template>

<style scoped></style>

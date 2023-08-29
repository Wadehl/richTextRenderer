<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'; //编辑器引入

import { computed } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(['update:modelValue']);

const valueCal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits('update:modelValue', newVal);
  },
});
</script>

<template>
  <div class="editor-container">
    <Editor
      api-key="5i4ze6722j330asiy6bh0nqh7j545ktlfdcjrrgf4c8o60pt"
      v-model="valueCal"
      :init="{
        plugins: 'lists link image table code help wordcount',
        toolbar:
          ' bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | undo redo | axupimgs | removeformat | emoticons | image link',
        height: 400,
      }"
    />
  </div>
</template>

<style lang="less">
.editor-container {
  width: 80vw;
  margin: 10px auto;
}
</style>

# A Demo of Renderer for Richtext

You can use it like this:

```vue
<script setup>
import richTextRenderer from '@/components/richTextRenderer.vue';
import { ref } from 'vue';

const richText = ref('')
</script>

<template>
   <rich-text-renderer :rich-text="richText">
</template>
```

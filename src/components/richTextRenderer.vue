<script setup lang="ts">
import { isNumber } from 'lodash-es';
import { ref, watch } from 'vue';

const props = defineProps({
  richText: String,
  imgMaxWidth: {
    type: String || Number,
    default: '100px',
  },
  videoMaxWidth: {
    type: String || Number,
    default: '100%',
  },
});

let { imgMaxWidth, videoMaxWidth } = props;
imgMaxWidth = isNumber(imgMaxWidth) ? `${imgMaxWidth}px` : imgMaxWidth;
videoMaxWidth = isNumber(videoMaxWidth) ? `${videoMaxWidth}px` : videoMaxWidth;

const nodes = ref([]);

const outer = document.createElement('div');

const renderRichText = () => {
  outer.innerHTML = props.richText;
  //将所有DOM节点分割存起来
  for (let i = 0; i < outer.childNodes.length; i++) {
    nodes.value.push(outer.childNodes[i]);
  }
};

renderRichText();

watch(props, () => {
  nodes.value = [];
  renderRichText();
});

const getNodeStyles = (node: any) => {
  const styles = {};
  const style = node.attributes?.style?.value;
  if (style) {
    const styleArr = style.split(';');
    styleArr.forEach((item) => {
      const [key, value] = item.split(':');
      styles[key] = value;
    });
  }
  return styles;
};

console.log(nodes.value);
</script>

<template>
  <template v-for="node in nodes">
    <p v-if="node.nodeName === 'P'" :style="getNodeStyles(node)">
      <rich-text-renderer :rich-text="node.innerHTML" />
    </p>
    <a-image
      v-if="node.nodeName === 'IMG'"
      :src="node.src"
      :style="Object.assign(getNodeStyles(node), { maxWidth: imgMaxWidth })"
    />
    <a
      v-else-if="node.nodeName === 'A'"
      :href="node.href"
      v-html="node.innerHTML"
      target="_blank"
    />
    <table v-else-if="node.nodeName === 'TABLE'">
      <tbody>
        <tr v-for="tr in node.rows">
          <td v-for="td in tr.cells">{{ td.textContent }}</td>
        </tr>
      </tbody>
    </table>
    <br v-else-if="node.nodeName === 'BR'" />
    <span v-else-if="node.nodeName === 'SPAN'" :style="getNodeStyles(node)">
      <rich-text-renderer :rich-text="node.innerHTML" />
    </span>
    <strong v-else-if="node.nodeName === 'STRONG'" :style="getNodeStyles(node)">
      <rich-text-renderer :rich-text="node.innerHTML" />
    </strong>
    <em v-else-if="node.nodeName === 'EM'" :style="getNodeStyles(node)">
      <rich-text-renderer :rich-text="node.innerHTML" />
    </em>

    <video
      v-else-if="node.nodeName === 'VIDEO'"
      :src="node.src"
      controls
      :style="{ maxWidth: videoMaxWidth }"
    />
    <template v-else-if="node.nodeName === '#text'">
      {{ node.textContent }}
    </template>
  </template>
</template>

<style scoped lang="less">
table {
  border-collapse: collapse;
  border-spacing: 0;
  word-break: keep-all;
  background-color: transparent;
  width: 50%;
  margin: 10px auto;
  border-color: gray;
  color: #000;

  td,
  th {
    padding: 2px;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    min-height: 20px;
    line-height: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6;
    text-align: center !important;
    vertical-align: middle !important;
  }
}
</style>

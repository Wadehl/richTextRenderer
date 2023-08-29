import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// import tinymce from 'tinymce';
// import 'tinymce/themes/silver/theme'; //编辑器主题
// import 'tinymce/icons/default'; //引入编辑器图标icon

createApp(App).use(Antd).mount('#app');

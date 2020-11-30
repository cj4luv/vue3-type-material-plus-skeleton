import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import SvgIcon from '@components/SvgIcon/index.vue';// svg component
import store from './store';
import App from './App.vue';
import router from './router';

import './icons';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus);

// register globally
app.component('svg-icon', SvgIcon);

app.mount('#app');

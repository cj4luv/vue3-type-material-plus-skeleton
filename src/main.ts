import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import Cookies from 'js-cookie';

import 'element-plus/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import './styles/element-variables.scss';
import '@styles/index.scss'; // global css

import SvgIcon from '@components/SvgIcon/index.vue';// svg component
import store from './store';
import App from './App.vue';
import router from './router';

import './icons';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
});

// register globally
app.component('svg-icon', SvgIcon);

app.mount('#app');

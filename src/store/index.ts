/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import getters from './getters';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((ac, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);

  ac = {
    ...ac,
    [moduleName]: value.default,
  };

  return ac;
}, {});

export default createStore({
  modules,
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  getters,
});

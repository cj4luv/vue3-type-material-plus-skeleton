/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import getters from './getters';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/);

console.log('object', modulesFiles.keys());

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules: any = modulesFiles.keys().reduce((m: any, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  console.log('moduleName', m, moduleName, value);

  if (m && m[moduleName]) {
    m = {
      [value.default]: {},
    };
  } else {
    m[moduleName] = value.default;
  }

  return m;
}, {});

export default createStore({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules,
  getters,
});

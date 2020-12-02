/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import getters from './getters';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules: any = modulesFiles.keys().reduce((ac: any, modulePath: string) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  // console.log('moduleName', m, moduleName, value);

  if (ac && ac[moduleName]) {
    ac = {
      [value.default]: {},
    };
  } else {
    ac[moduleName] = {
      ...ac,
      ...value.default,
    };
  }

  console.log('ac', ac);
  return ac;
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

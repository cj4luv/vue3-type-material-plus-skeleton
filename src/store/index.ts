/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import getters from './getters';
import { state as appState } from './modules/app';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/);

export const State = {
  app: appState,
};

export type State = typeof State;

export interface Ac {
  [key: string]: State | any;
}

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles
  .keys().reduce((ac: Ac, modulePath) => {
  // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    console.log('moduleName', value.default, moduleName);

    if (ac && ac[moduleName]) {
      ac = {
        ...ac,
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

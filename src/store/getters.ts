import { GetterTree } from 'vuex';

import { state } from './modules/app';

const app = {
  app: state,
};

type State = typeof app;

const getters: GetterTree<State, State> = {
  sidebar: (s) => s.app.sidebar,
  size: (s) => s.app.size,
  device: (s) => s.app.device,
  // visitedViews: (state) => state.tagsView.visitedViews,
  // cachedViews: (state) => state.tagsView.cachedViews,
  // token: (state) => state.user.token,
  // avatar: (state) => state.user.avatar,
  // name: (state) => state.user.name,
  // introduction: (state) => state.user.introduction,
  // roles: (state) => state.user.roles,
  // permissionRoutes: (s) => s.permission.routes,
  // errorLogs: (state) => state.errorLog.logs,
};
export default getters;

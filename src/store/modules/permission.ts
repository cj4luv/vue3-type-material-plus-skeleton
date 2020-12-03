/* eslint-disable no-param-reassign */
import { MutationTree, ActionTree } from 'vuex';

import { asyncRoutes, constantRoutes, CustomRouteRecordSingleView } from '@router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any, roles: any) {
  const res: any = [];

  routes.forEach((route: any) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export const state = {
  routes: [],
  addRoutes: [],
};

export interface State {
  routes: CustomRouteRecordSingleView[];
  addRoutes: [];
}

export enum MutationTypes {
  SET_ROUTES = 'SET_ROUTES',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ROUTES](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ROUTES]: (st, routes) => {
    st.addRoutes = routes;
    st.routes = constantRoutes.concat(routes);
  },
};

export enum ActionTypes {
  generateRoutes = 'generateRoutes',
}

const actions: ActionTree<State, State> = {
  [ActionTypes.generateRoutes]({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

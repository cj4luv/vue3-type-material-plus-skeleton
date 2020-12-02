/* eslint-disable no-shadow */
import Cookies from 'js-cookie';
import { MutationTree, ActionTree, ActionContext } from 'vuex';

export const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Number(Cookies.get('sidebarStatus')) : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
};

export type State = typeof state;

export enum MutationTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  TOGGLE_DEVICE = 'TOGGLE_DEVICE',
  SET_SIZE = 'SET_SIZE',
}

export interface Sidebar {
  opened: boolean;
  withoutAnimation: boolean;
}

export type Mutations<S = State> = {
  [MutationTypes.TOGGLE_SIDEBAR](state: S, payload: Sidebar): void;
  [MutationTypes.CLOSE_SIDEBAR](state: S, payload: boolean): void;
  [MutationTypes.TOGGLE_DEVICE](state: S, payload: string): void;
  [MutationTypes.SET_SIZE](state: S, payload: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.TOGGLE_SIDEBAR]: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
  },
  [MutationTypes.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', '0');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  [MutationTypes.TOGGLE_DEVICE]: (state, device) => {
    state.device = device;
  },
  [MutationTypes.SET_SIZE]: (state, size) => {
    state.size = size;
    Cookies.set('size', size);
  },
};

export enum ActionTypes {
  toggleSideBar = 'toggleSideBar',
  closeSideBar = 'closeSideBar',
  toggleDevice = 'toggleDevice',
  setSize = 'setSize',
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & ActionContext<State, State>

export interface Actions {
  [ActionTypes.toggleSideBar](
    { commit }: AugmentedActionContext,
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.toggleSideBar]({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  [ActionTypes.closeSideBar]({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  [ActionTypes.toggleDevice]({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  [ActionTypes.setSize]({ commit }, size) {
    commit('SET_SIZE', size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

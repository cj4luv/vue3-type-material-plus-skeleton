import { Component } from 'vue';
import {
  createRouter, createWebHistory, _RouteRecordBase, RouteLocationNormalized,
} from 'vue-router';

import { routerPaths } from '@constants';
import { NotFound } from '@views';
import Layout from '@layouts';

type RouteComponent = Component;
type Lazy<T> = () => Promise<T>;
type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

type _RouteRecordProps = boolean
| Record<string, any>
| ((to: RouteLocationNormalized) => Record<string, any>);

export interface CustomRouteRecordSingleView extends _RouteRecordBase {
  component: RawRouteComponent;
  components?: never;
  hidden?: boolean;
  alwaysShow?: boolean;
  props?: _RouteRecordProps;
}

export const constantRoutes: Array<CustomRouteRecordSingleView> = [
  {
    path: routerPaths.redirect,
    component: Layout,
    hidden: true,
    children: [
      {
        path: `${routerPaths.redirect}/:path(.*)`,
        component: () => import('@views/Redirect.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@views/login/auth-redirect.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@views/error-page/401.vue'),
    hidden: true,
  },
  {
    path: routerPaths.root,
    component: Layout,
    redirect: routerPaths.dashboard,
    children: [
      {
        path: routerPaths.dashboard,
        component: () => import('@views/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  { path: '/*', component: NotFound },
];

export const asyncRoutes = [];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = true;
    if (!auth) {
      next({
        path: routerPaths.login,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

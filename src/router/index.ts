import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { routerPaths } from '@constants';
import { Home, NotFound } from '@views';
import { DefaultLayout } from '@layouts';

const routes: Array<RouteRecordRaw> = [
  {
    path: routerPaths.root,
    component: DefaultLayout,
    redirect: routerPaths.home,
    children: [
      {
        path: routerPaths.home,
        name: 'Home',
        meta: { requiresAuth: true },
        component: Home,
      },
    ],
  },
  {
    path: routerPaths.login,
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@layouts/LoginLayout.vue'),
    meta: { requiresAuth: false },
  },
  { path: '/*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('router before', to.matched);
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

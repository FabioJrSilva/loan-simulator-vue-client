import multiguard from 'vue-router-multiguard';
import AuthGuard from '@/guards/auth';

const beforeEnter = multiguard([AuthGuard]);

export default [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
    meta: {
      layout: 'auth',
      title: 'Login',
    },
  },

  {
    path: '/home',
    name: 'auth.home',
    beforeEnter,
    component: () => import(/* webpackChunkName: "auth" */ '../views/Home.vue'),
    meta: {
      layout: 'app',
      title: 'Home',
    },
  },
];

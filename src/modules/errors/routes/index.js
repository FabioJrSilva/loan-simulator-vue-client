export default [
  {
    path: '/404',
    name: 'error.404',
    component: () => import(/* webpackChunkName: "error" */ '../views/NotFound.vue'),
    meta: {
      layout: 'error',
      title: 'Página não encontrada',
    },
  },
  {
    path: '/500',
    name: 'error.500',
    component: () => import(/* webpackChunkName: "error" */ '../views/ServerError.vue'),
    meta: {
      layout: 'error',
      title: 'Ops...',
    },
  },
  {
    path: '*',
    redirect: { name: 'error.404' },
  },
];

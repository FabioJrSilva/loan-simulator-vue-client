export default [
  {
    path: '/',
    name: 'simulator',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Simulator.vue'),
    meta: {
      layout: 'auth',
      title: 'Simulação',
    },
  },
];

import Vue from 'vue';
import VueRouter from 'vue-router';
import config from '@/config/router';
import { setPageTitle } from '@/helpers';

Vue.use(VueRouter);

const router = new VueRouter({
  ...config,
});

/** Default guard */
router.beforeResolve((to, from, next) => {
  setPageTitle(to.meta.title);

  return next();
});

export default router;

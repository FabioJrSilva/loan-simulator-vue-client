export default {
  app: () => import('@/layouts/app/AppLayout.vue'),
  auth: () => import('@/layouts/auth/AuthLayout.vue'),
  error: () => import('@/layouts/error/ErrorLayout.vue'),
};

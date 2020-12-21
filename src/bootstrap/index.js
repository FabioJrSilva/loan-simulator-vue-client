import Vue from 'vue';
import VueModules from '@/plugins/modules';
import VueMask from 'v-mask';
import '@/plugins/vee-validate';
import VueToastr from 'vue-toastr';

/** Configs */
import modules from '@/config/modules';

window._ = require('lodash');
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
export const router = require('./router').default;
export const store = require('./store').default;

Vue.use(VueMask);
Vue.use(VueToastr);

Vue.use(VueModules, { modules, store, router });

export default {
  router,
  store,
};

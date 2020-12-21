import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'typeface-poppins';
import '@mdi/font/css/materialdesignicons.css';
import config from '@/config/vuetify';

Vue.use(Vuetify);

export default new Vuetify(config);

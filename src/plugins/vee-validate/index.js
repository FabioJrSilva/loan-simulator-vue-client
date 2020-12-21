import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  localize,
  extend,
} from 'vee-validate';
import { required, email, confirmed, min, max, alpha } from 'vee-validate/dist/rules';

import ptBR from 'vee-validate/dist/locale/pt_BR.json';

setInteractionMode('eager');

// install rules
extend('required', {
  ...required,
  message: 'Este campo é obrigatório',
});

extend('email', {
  ...email,
  message: 'Este campo precisa ser do tipo e-mail',
});

extend('max', max);

extend('alpha', alpha);

extend('confirmed', {
  ...confirmed,
  message: 'As senhas precisam ser iguais.',
});

extend('min', {
  ...min,
  message: 'A senha precisa ter no mínimo 8 caracteres.',
});

localize('ptBR', ptBR);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

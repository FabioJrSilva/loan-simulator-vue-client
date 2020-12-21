import api from '@/plugins/api';

export default () => {
  return api.get('loan-categories');
};

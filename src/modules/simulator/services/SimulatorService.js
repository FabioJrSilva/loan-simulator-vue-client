import api from '@/plugins/api';

export default (data) => {
  return api.post('loan-simulation', data);
};

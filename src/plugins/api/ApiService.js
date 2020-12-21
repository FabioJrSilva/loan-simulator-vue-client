import axios from 'axios';
import { store, router } from '@/bootstrap';
import TokenService from '@/modules/auth/services/TokenService';

export default class ApiService {
  constructor(config) {
    this.client = axios.create(config);
    this.accessToken = TokenService.getToken();
    this.interceptors = {};
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    return this;
  }

  getAccessToken() {
    return this.accessToken;
  }

  withAuthorizationHeader() {
    const accessToken = this.getAccessToken();

    if (!_.isEmpty(accessToken)) {
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    return this;
  }

  removeAuthorizationHeader() {
    delete this.client.defaults.headers.common.Authorization;

    return this;
  }

  withAuth() {
    this.withAuthorizationHeader();
    this.use401Interceptor();

    return this;
  }

  use401Interceptor() {
    if (!_.has(this.interceptors, '401')) {
      this.interceptors['401'] = this.client.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response.status === 401) {
            store.dispatch('auth/signOut').then(() => {
              router.push('/login');
            });
          }
          return Promise.reject(error);
        },
      );
    }

    return this;
  }

  eject401Interceptor() {
    this.client.interceptors.response.eject(this.interceptors['401']);
    delete this.interceptors['401'];

    return this;
  }

  async get(resource, config = {}) {
    return this.client.get(resource, config);
  }

  async post(resource, data, config = {}) {
    return this.client.post(resource, data, config);
  }

  async put(resource, data, config = {}) {
    return this.client.put(resource, data, config);
  }

  async patch(resource, data, config = {}) {
    return this.client.patch(resource, data, config);
  }

  async delete(resource, config = {}) {
    return this.client.delete(resource, config);
  }

  async request(payload) {
    return this.client.request(payload);
  }
}

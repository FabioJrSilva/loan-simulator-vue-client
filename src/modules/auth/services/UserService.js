import api from '@/plugins/api';

/**
 * @class UserService
 */
class UserService {
  /**
   * Fetch authenticated user by access token
   *
   * @returns {Promise}
   */
  fetchUser(accessToken) {
    return api
      .setAccessToken(accessToken)
      .withAuth()
      .get('auth/self');
  }

  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));

    return this;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  removeUser() {
    localStorage.removeItem('user');

    return this;
  }
}
export const UserServiceInstance = UserService;

export default new UserService();

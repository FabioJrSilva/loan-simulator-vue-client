class TokenService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
  }

  getToken() {
    return this.accessToken;
  }

  saveToken(accessToken) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);

    return this;
  }

  removeToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');

    return this;
  }
}

export const TokenServiceInstance = TokenService;

export default new TokenService();

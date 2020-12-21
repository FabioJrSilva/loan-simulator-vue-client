import api from '@/plugins/api';
import TokenService from './TokenService';
import UserService from './UserService';

class AuthService {
  async signIn(forms) {
    await api.post('/auth/signin', forms).then((res) => {
      TokenService.saveToken(res.data.token);
    });

    const response = await UserService.fetchUser(TokenService.getToken());
    UserService.saveUser(response.data);
  }

  signOut() {
    TokenService.removeToken();
    UserService.removeUser();
  }
}

export default new AuthService();

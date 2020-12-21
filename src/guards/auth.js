import { router } from '@/bootstrap';
import TokenService from '@/modules/auth/services/TokenService';
import UserService from '@/modules/auth/services/UserService';

export default function(to, from, next) {
  if (!TokenService.getToken() || !UserService.getUser()) {
    // Redirect to login page
    return router.push({ name: 'auth.login' });
  }

  return next();
}

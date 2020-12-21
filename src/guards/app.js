import { setPageTitle } from '@/helpers';

export default function ({ next, to }) {
  setPageTitle(to.meta.title);

  return next();
}

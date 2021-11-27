import { Login, Profile, Status, Callback, Logout } from './pages';
import { Dashboard } from './pages/Dashboard';
import { DataInput } from './pages/DataInput';
import { GenerateCopy } from './pages/GenerateCopy';
import { Content } from './pages/Content'

const routes = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/profile',
    component: Profile,
    isPrivate: true,
  },
  {
    path: '/status',
    component: Status,
    isPrivate: false,
  },
  {
    path: '/callback',
    component: Callback,
    isPrivate: false,
  },
  {
    path: '/logout',
    component: Logout,
    isPrivate: true,
  },
  {
    path: '/generate',
    component: GenerateCopy,
    isPrivate: true,
  },
  {
    path: '/content',
    component: Content,
    isPrivate: true,
  },
  {
    path: '/data',
    component: DataInput,
    isPrivate: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: '/*',
    component: Profile,
    isPrivate: true,
  },
];

export default routes;

import {Router} from './modules';
import {
  Chat,
  Login,
  PasswordEditing,
  Profile,
  Registration,
  Error400Page,
} from './pages';
import {ErrorPage} from './components';
import {Routes} from './types';

const router = new Router('.app');
router
  .use(Routes.Login, Login)
  .use(Routes.Chat, Chat)
  .use(Routes.PasswordEditing, PasswordEditing)
  .use(Routes.Profile, Profile)
  .use(Routes.Registration, Registration)
  .useError(Error400Page)
  .start();

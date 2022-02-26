import {Router} from './modules';
import {
  Chat,
  Login,
  PasswordEditing,
  Profile,
  Registration,
  Error400Page,
  Settings,
} from './pages';
import chatController from './services/chat/chatController';
import {Routes} from './types';

const router = new Router('.app');
router
  .use(Routes.Login, Login)
  .use(Routes.Chat, Chat)
  .use(Routes.PasswordEditing, PasswordEditing)
  .use(Routes.Profile, Profile)
  .use(Routes.Settings, Settings)
  .use(Routes.Registration, Registration)
  .useError(Error400Page)
  .start();

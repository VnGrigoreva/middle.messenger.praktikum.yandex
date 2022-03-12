import {Router} from "./modules";
import {
  Chat,
  // Login,
  PasswordEditing,
  Profile,
  Registration,
  Error400Page,
  Settings,
} from "./pages";
import {Routes} from "./types";
import "./main.scss";

const router = new Router(".app");
router
  // .use(Routes.Login, Login)
  .use(Routes.Login, Chat)
  .use(Routes.Chat, Chat)
  .use(Routes.PasswordEditing, PasswordEditing)
  .use(Routes.Profile, Profile)
  .use(Routes.Settings, Settings)
  .use(Routes.Registration, Registration)
  .useError(Error400Page)
  .start();

import { NewUserComponent } from "../components/users/new-user/new-user.component";
import { UsersComponent } from "../components/users/users.component";

export const USER_ROUTES = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  }
];

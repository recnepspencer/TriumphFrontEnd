import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () =>
      import('./routes/test.routes').then(m => m.TEST_ROUTES),
  },
  {
    path: 'login-page',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

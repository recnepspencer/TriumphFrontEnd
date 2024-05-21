import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () =>
      import('./routes/test.routes').then(m => m.TEST_ROUTES),
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

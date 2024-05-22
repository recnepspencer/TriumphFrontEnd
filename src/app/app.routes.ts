import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FullScreenComponent } from './components/layouts/full-screen/full-screen.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
  },
  {
    path: '', component: FullScreenComponent, children: [
      {
        path: 'login-page', component: LoginComponent
      }
    ]
  },
  {
    path: '',component: NavigationComponent, children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./routes/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./routes/profile.routes').then(m => m.PROFILE_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./routes/users.routes').then(m => m.USER_ROUTES),
      }
    ]
  }
];

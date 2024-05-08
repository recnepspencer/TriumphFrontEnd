import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () =>
      import('./routes/test.routes').then(m => m.TEST_ROUTES),
  }
];

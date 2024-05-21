import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(AuthModule.forRoot({
      domain: 'dev-6jjjgfzu0zoja45d.us.auth0.com',
      clientId: 'iNd0Rz04k83uUITFgfRKG5bU53dUDKGr',
      authorizationParams:{
        redirect_uri: 'http://localhost:4200/login-page',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    })),
  

    HttpClientModule,
    provideHttpClient()
  ]
});
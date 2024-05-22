import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, SharedModule]
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {


    this.auth.isAuthenticated$.subscribe({
      next: (isLoggedIn) => {
        console.log('Initial login state:', isLoggedIn);
        if (isLoggedIn) {
          // Redirect to the home page or a protected page if logged in
          this.router.navigate(['/dashboard']);
        } else {
          this.auth.loginWithRedirect({
            authorizationParams: {
              prompt: 'login',
            },
          }).subscribe({
            next: () => this.auth.handleRedirectCallback(),
          });
        }
      },
      error: (err) => console.error('Error checking initial authentication status:', err)
    });
  }

  onSubmit() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        prompt: 'login',
      },
    }).subscribe({
      next: () => this.auth.handleRedirectCallback(),
    });
  }

  onLogout() {
    this.auth.logout()
  }

  onIsLoggedIn() {
    // Check and log the authentication state
    this.auth.isAuthenticated$.subscribe({
      next: (isLoggedIn) => {
        console.log('Is logged in:', isLoggedIn);
      },
      error: (err) => console.error('Error checking authentication status:', err)
    });
  }
}

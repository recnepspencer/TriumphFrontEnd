import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule,
    SharedModule]
  
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {}

  onSubmit() {
    this.auth.loginWithRedirect().subscribe({
      next: () => console.log('Logged in'),
      error: (err) => console.log('Something went wrong: ', err)
    });
    console.log('Login');
  }
  onLogout() {
    this.auth.logout().subscribe({
      next: () => console.log('Logged out'),
      error: (err) => console.log('Something went wrong: ', err)
    });
  }
  onGetToken(){
    this.auth.idTokenClaims$.subscribe((data) => {
      console.log(data);
    }
  )}
}
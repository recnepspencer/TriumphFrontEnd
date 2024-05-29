import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user$ = this.auth.user$;
  user: any;

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setUserInfo();
  }

  setUserInfo() {
    this.user$.subscribe(
      (data) => {
        if (data) {
          this.user = data;
          this.checkOrCreateUser();
        }
      }
    );
  }

  checkOrCreateUser() {
    const sendObj = {
      email: this.user.email,
      username: this.user.name,
      auth0Id: this.user.sub
    };

    this.userService.checkUserExists(sendObj.username, sendObj.email, sendObj.auth0Id).subscribe({
      next: (response) => {
        if (response.isNewUser) {
          console.log('User created:', response.user);
        } else {
          console.log('User data:', response.user);
        }
      },
      error: (error) => {
        console.error('Error checking or creating user:', error);
      }
    });
  }
}

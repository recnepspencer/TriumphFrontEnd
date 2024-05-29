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
export class DashboardComponent  implements OnInit {
  user$ = this.auth.user$;
  user: any;
  constructor(
    private auth: AuthService,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.setUserInfo();
  }

  setUserInfo() {
    this.user$.subscribe(
      (data) => {
        this.user = data;
        this.createUser();
      }
    );
    // this.createUser();
  }

  createUser() {
    const sendObj = {
      email: this.user.email,
      username: this.user.name,
      auth0Id: this.user.sub
    };

    this.usersService.create(sendObj).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}

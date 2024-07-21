import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import {personOutline, peopleOutline, gridOutline, homeOutline, logOutOutline, calendarClearOutline, radioButtonOffOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent  implements OnInit {
  // Spencer you can add Icons from ionicons here. Just look that up in google. If you want to add custom icons, you can add them in assets custom-icons. I try and use svgs for custom icons.
  iconsToAdd = {
    homeOutline,
    gridOutline,
    logOutOutline,
    calendarClearOutline,
    radioButtonOffOutline, 
    personOutline,
    peopleOutline
  }

  public appPages = [
    { title: 'Dashboard', url: 'dashboard', icon: 'home-outline' },
    { title: 'Profile', url: 'profile', src: 'assets/navigation-icons/person-outline.svg' },
    { title: 'Users', url: 'users', icon: 'people-outline' },
    { title: 'Fields', url: 'fields', icon: 'radio-button-off-outline' },
    { title: 'Organizations', url: 'organizations', icon: 'people-outline' },
    {title: 'Schedule', url: 'schedule', icon: 'calendar-clear-outline' },
  ]

  constructor(
    private menu: MenuController,
    private router: Router,
    public environmentInjector: EnvironmentInjector,
    private auth: AuthService,
    private userService: UserService
  ) {
    addIcons(this.iconsToAdd);
  }

  ngOnInit() {
    this.setUserInfo();
  }

  checkOrCreateUser() {
    const sendObj = {
      email: this.user.email,
      username: this.user.name,
      auth0Id: this.user.sub
    };

    this.userService.checkUserExists(sendObj.username, sendObj.email, sendObj.auth0Id).subscribe({
      next: this.checkOrCreateUserNext.bind(this),
      error: this.checkOrCreateUserError.bind(this)
    });
  }

  checkOrCreateUserNext(response: any) {
    if (response.newUser) {
      this.router.navigate([`/users/new-user`, { 'user-id': response.user._id }]);
    } else {
      console.log('User data:', response);
    }
    localStorage.setItem('user-id', JSON.stringify(response.user._id));
  }

  checkOrCreateUserError(error: any) {
    console.error('Error checking or creating user:', error);
  }

  navigate(url: string, event: Event) {
    this.menu.close('menu').then(() => {
      this.router.navigate([url]);
    });
  }

  onLogout() {
    this.auth.logout()
    this.router.navigate(['login-page']);
  }

  user$ = this.auth.user$;
  user: any;

  userChecked: boolean = false;

  setUserInfo() {
    this.user$.subscribe(
      (data) => {
        if (data) {
          this.user = data;
          if (!this.userChecked) {
            this.userChecked = true;
            this.checkOrCreateUser();
          }
        }
      }
    );
  }



}

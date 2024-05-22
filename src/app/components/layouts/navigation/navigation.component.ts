import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { gridOutline, homeOutline, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '@auth0/auth0-angular';

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
    logOutOutline
  }

  public appPages = [
    { title: 'Dashboard', url: 'dashboard', icon: 'home-outline' },
    { title: 'Profile', url: 'profile', src: 'assets/custom-icons/profile.svg' },
    { title: 'Users', url: 'users', icon: 'grid-outline' },
  ]

  constructor(
    private menu: MenuController,
    private router: Router,
    public environmentInjector: EnvironmentInjector,
    private auth: AuthService
  ) {
    addIcons(this.iconsToAdd);
  }

  ngOnInit() {}

  navigate(url: string, event: Event) {
    this.menu.close('menu').then(() => {
      this.router.navigate([url]);
    });
  }

  onLogout() {
    this.auth.logout()
    this.router.navigate(['login-page']);
  }
}

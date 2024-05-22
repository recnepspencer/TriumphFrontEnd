import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent  implements OnInit {

  iconsToAdd = { homeOutline }

  public appPages = [
    { title: 'Dashboard', url: 'dashboard', icon: 'home-outline' },
    { title: 'Profile', url: 'profile', src: 'assets/custom-icons/profile.svg' },
  ]

  constructor(
    private menu: MenuController,
    private router: Router,
    public environmentInjector: EnvironmentInjector
  ) {
    addIcons(this.iconsToAdd);
  }

  ngOnInit() {}

  navigate(url: string, event: Event) {
    this.menu.close('menu').then(() => {
      this.router.navigate([url]);
    });
  }
}

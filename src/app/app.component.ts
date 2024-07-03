import { AfterViewInit, Component, EnvironmentInjector, OnDestroy, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonToolbar } from '@ionic/angular/standalone';
import { Subscription, filter } from 'rxjs';
import { LayoutService } from './services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { FullScreenComponent } from './components/layouts/full-screen/full-screen.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonToolbar, FullScreenComponent, NavigationComponent, IonApp, IonRouterOutlet],
})
export class AppComponent {
  currentLayout: string = 'default';
  private layoutSub!: Subscription;

  isLoaded = false;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    public environmentInjector: EnvironmentInjector,
    private auth: AuthService
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('/login')) {
        this.layoutService.setLayout('fullscreen');
      } else {
        this.layoutService.setLayout('navigation');
      }
    });
  }

  ngOnInit() {
    this.layoutSub = this.layoutService.layout$.subscribe(layout => {
      this.currentLayout = layout;
    });
  }

  ngAfterViewInit() {
    this.isLoaded = true;
  }

  ngOnDestroy() {
    this.layoutSub.unsubscribe();
  }
}

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent  implements OnInit {
  auth = inject(AuthService);
  title = 'Decoded ID Token';
  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));

  constructor() { }

  ngOnInit() {}

  onDisplayDetails(){
    this.code$.subscribe({
      next: (code) => {
        console.log('Decoded ID Token:', code);
      },
      error: (err) => console.error('Error decoding ID Token:', err)
    });
    this.user$.subscribe({
      next: (user) => {
        console.log('User:', user);
      },
      error: (err) => console.error('Error getting user:', err)
    });
  }

}

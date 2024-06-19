// import { Component, OnInit } from '@angular/core';
// import { SharedModule } from '../shared/shared.module';
// import { AuthService } from '@auth0/auth0-angular';
// import { UserService } from 'src/app/services/user/user.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
// })
// export class DashboardComponent implements OnInit {
//   user$ = this.auth.user$;
//   user: any;

//   constructor(
//     private auth: AuthService,
//     private userService: UserService
//   ) { }

//   ngOnInit() {
//     this.setUserInfo();
//   }

//   setUserInfo() {
//     this.user$.subscribe(
//       (data) => {
//         if (data) {
//           this.user = data;
//           this.checkOrCreateUser();
//         }
//       }
//     );
//   }

//   checkOrCreateUser() {
//     const sendObj = {
//       email: this.user.email,
//       username: this.user.name,
//       auth0Id: this.user.sub
//     };

//     this.userService.checkUserExists(sendObj.username, sendObj.email, sendObj.auth0Id).subscribe({
//       next: this.checkOrCreateUserNext.bind(this),
//       error: this.checkOrCreateUserError.bind(this)
//     });
//   }

//   checkOrCreateUserNext(response: any) {
//     if (response.isNewUser) {
//       console.log('User created:', response);
//     } else {
//       console.log('User data:', response);
//     }
//   }

//   checkOrCreateUserError(error: any) {
//     console.error('Error checking or creating user:', error);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // user$ = this.auth.user$;
  // user: any;

  // userChecked: boolean = false;

  // constructor(
  //   private auth: AuthService,
  //   private userService: UserService,
  //   private router: Router
  // ) { }

  // ngOnInit() {
  //   this.setUserInfo();
  // }

  // setUserInfo() {
  //   this.user$.subscribe(
  //     (data) => {
  //       if (data) {
  //         this.user = data;
  //         if (!this.userChecked) {
  //           this.userChecked = true;
  //           this.checkOrCreateUser();
  //         }
  //       }
  //     }
  //   );
  // }

  // checkOrCreateUser() {
  //   const sendObj = {
  //     email: this.user.email,
  //     username: this.user.name,
  //     auth0Id: this.user.sub
  //   };

  //   this.userService.checkUserExists(sendObj.username, sendObj.email, sendObj.auth0Id).subscribe({
  //     next: this.checkOrCreateUserNext.bind(this),
  //     error: this.checkOrCreateUserError.bind(this)
  //   });
  // }

  // checkOrCreateUserNext(response: any) {
  //   if (response.newUser) {
  //     this.router.navigate([`/users/new-user`, { 'user-id': response.user._id }]);
  //   } else {
  //     console.log('User data:', response);
  //   }
  // }

  // checkOrCreateUserError(error: any) {
  //   console.error('Error checking or creating user:', error);
  // }
}


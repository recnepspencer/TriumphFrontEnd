import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent  implements OnInit {
  newUserForm: FormGroup;
  userId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private menu: MenuController,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required]
    });

    addIcons({menuOutline});
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('user-id') ?? '';
  }

  getUserId() {

  }
  openMenu() {
    this.menu.open('end');
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      this.updateUser();
    }
  }

  updateUser() {
    const sendObj = {
      username: this.newUserForm.value.firstName + ' ' + this.newUserForm.value.lastName,
      birthDate: this.newUserForm.value.birthDate
    }

    this.userService.update(this.userId, sendObj).subscribe({
      next: this.updateUserNext.bind(this),
      error: this.updateUserError.bind(this)
    });
  }

  updateUserNext(response: any) {
    this.router.navigate(['/profile']);
    console.log('User updated:', response);
  }

  updateUserError(error: any) {
    console.error('Error updating user:', error);
  }
}

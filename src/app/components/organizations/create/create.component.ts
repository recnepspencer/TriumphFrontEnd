import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {

  users: any = [];
  organizationForm: FormGroup = new FormGroup({});

  constructor(
    private organizationsService: OrganizationsService,
    private userService: UserService,
    private FormBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.getUsers();
  }

  createForm() {
    this.organizationForm = this.FormBuilder.group({
      name: [''],
      owner_id: [''],
      user_ids: ['']
    });
  }

  onCreateOrganization() {
    this.createOrganization();
  }

  createOrganization() {
    const sendObj = {
      name: this.organizationForm.value.name,
      owner_id: this.organizationForm.value.owner_id,
      user_ids: this.organizationForm.value.user_ids
    }
    this.organizationsService.create(sendObj).subscribe({
      next: this.createOrganizationNext.bind(this),
      error: this.createOrganizationError.bind(this),
    });
  }

  createOrganizationNext(data: any) {
    this.router.navigate(['/organizations']);
  }

  createOrganizationError(error: any) {
    console.log(error);
  }

  getUsers() {
    this.userService.index().subscribe((data) => {
      this.users = data;
      this.createForm();
    });
  }

}

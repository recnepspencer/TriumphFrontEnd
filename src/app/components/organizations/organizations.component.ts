import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent  implements OnInit {

  organizations: any = [];

  addOutline = addOutline;

  constructor(
    private organizationsService: OrganizationsService,
    private router: Router
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizationsService.index().subscribe((data) => {
      this.organizations = data;
    });
  }

  onCreate() {
    this.router.navigate(['organizations/create']);
  }

  onOrganization(id: string) {
    this.router.navigate(['organizations', id]);
  }

}

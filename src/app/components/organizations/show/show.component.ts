import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  organization: any;

  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getOrganization(id);
    }
  }

  getOrganization(id: string) {
    this.organizationsService.show(id).subscribe(
      data => this.organization = data,
      error => console.error('Error fetching organization:', error)
    );
  }
}

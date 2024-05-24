import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FieldsService } from 'src/app/services/fields/fields.service';
import { Router } from '@angular/router';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent  implements OnInit {
  fields: any = []

  addOutline = addOutline;

  constructor(
    private fieldsService: FieldsService,
    private router: Router
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.getFields();
  }

  getFields() {
    this.fieldsService.index().subscribe( {
      next: this.getFieldsNext.bind(this),
      error: this.getFieldsError.bind(this)
    });
  }

  getField(id: string) {
    this.fieldsService.show(id).subscribe((data) => {

    });
  }

  getFieldsNext(data: any) {
    this.fields = data;
  }

  getFieldsError() {
  }

  onCreate() {
    this.router.navigate(['fields/create']);
  }
}

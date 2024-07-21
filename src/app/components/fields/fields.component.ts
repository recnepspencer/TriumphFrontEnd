import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldsService } from 'src/app/services/fields/fields.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { FieldDetailsComponent } from './field-details/field-details.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit {
  fields: any[] = [];

  fieldOptions: Array<{ value: string, label: string }> = [];


  addOutline = addOutline;
  fieldsLoading: boolean = true;

  constructor(
    private fieldsService: FieldsService,
    private router: Router,
    private modalController: ModalController
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.loadFields();
  }

  
  loadFields() {
    this.fieldsService.index().subscribe(fields => {
      this.fields = fields;
      this.populateFieldOptions();
    });
  }

  populateFieldOptions() {
    this.fieldOptions = this.fields.map(field => ({
      value: field._id,
      label: field.name
    }));
  }

  navigateToAddField() {
    this.router.navigate(['/fields/create']);
  }

  async navigateToFieldDetails(field: any) {
    console.log('Field being passed to modal:', field);
    const modal = await this.modalController.create({
      component: FieldDetailsComponent,
      componentProps: { field: field }
    });
    return await modal.present();
  }
}

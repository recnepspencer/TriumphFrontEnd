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
export class FieldsComponent implements OnInit {
  fields: any = [];

  addOutline = addOutline;

  fieldsLoading: boolean = true;

  constructor(
    private fieldsService: FieldsService,
    private router: Router
  ) {
    addIcons({ addOutline });
  }



  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter() {
    this.getFields();
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }



  getFields() {
    this.fieldsLoading = true;
    this.fieldsService.index().subscribe({
      next: this.getFieldsNext.bind(this),
      error: this.getFieldsError.bind(this)
    });
  }

  getFieldsNext(data: any) {
    this.fields = data;
    this.fieldsLoading = false;
  }

  getFieldsError() {
    // Handle error
    this.fieldsLoading = false;
  }

  getField(id: string) {
    this.fieldsService.show(id).subscribe((data) => {
      // Handle single field fetch
    });
  }


  onCreate() {
    this.router.navigate(['fields/create']);
  }
}

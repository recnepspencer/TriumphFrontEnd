import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FieldsService } from 'src/app/services/fields/fields.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {
  addOutline = addOutline;
  newField: FormGroup = new FormGroup({});

  crops = [
    {
      id: "664caf594058d1d23e19d1c8",
      name: "Sugar Beets",
      waterRequirement: 2
    },
    {
      id: "664cb387d5f5ff9b1aded839",
      name: "Wheat",
      waterRequirement: 2
    }
  ]

  irrigationTypes = [
    {
      id: "664bee39b81268c3e3bfe1b4",
      name: "handline"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private fieldsService: FieldsService
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newField = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      crop: ['', Validators.required],
      irrigationType: ['', Validators.required],
    });
  }

  onCreateField() {
    // console.log(this.newField.value);
    this.fieldsService.create(this.newField.value).subscribe((data) => {
      console.log(data);
    });
  }

}

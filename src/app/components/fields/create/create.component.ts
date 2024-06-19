import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FieldsService } from 'src/app/services/fields/fields.service';
import { IrrigationService } from 'src/app/services/irrigation/irrigation.service';
import { CropService } from 'src/app/services/crop/crop.service';
import { ModalController } from '@ionic/angular';
import { IrrigationModalComponent } from './irrigation-modal/irrigation-modal.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  addOutline = addOutline;
  newField: FormGroup = new FormGroup({});
  crops: any[] = [];
  irrigationTypes: any[] = [];
  selectedIrrigationType: any;

  handlineIcon: string = 'assets/irrigation-icons/handline-icon.png';

  constructor(
    private formBuilder: FormBuilder,
    private fieldsService: FieldsService,
    private irrigationService: IrrigationService,
    private cropService: CropService,
    private modalController: ModalController
  ) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.createForm();
    this.loadCrops();
    this.loadIrrigationTypes();
  }

  createForm() {
    this.newField = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      crop: ['', Validators.required],
      irrigationType: ['', Validators.required],
    });
  }

  loadCrops() {
    this.cropService.index().subscribe(
      (data) => {
        this.crops = data.map((crop: any) => ({
          id: crop._id, // Ensure you use the ObjectId
          name: crop.name.trim() // Trim any extra spaces from the crop name
        }));
      },
      (error) => {
        console.error('Error loading crops:', error);
      }
    );
  }

  loadIrrigationTypes() {
    this.irrigationService.index().subscribe(
      (data) => {
        this.irrigationTypes = data.map((irrigation: any) => ({
          id: irrigation._id,
          name: irrigation.type,
          imagePath: irrigation.imagePath,
        }));
      },
      (error) => {
        console.error('Error loading irrigation types:', error);
      }
    );
  }

  async openIrrigationTypeModal() {
    const modal = await this.modalController.create({
      component: IrrigationModalComponent,
      componentProps: {
        irrigationTypes: this.irrigationTypes,
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectIrrigationType(data.data);
      }
    });

    await modal.present();
  }

  selectIrrigationType(irrigationType: any) {
    this.selectedIrrigationType = irrigationType;
    this.newField.controls['irrigationType'].setValue(irrigationType.id);
  }

  onCreateField() {
    if (this.newField.valid) {
      this.fieldsService.create(this.newField.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error creating field:', error);
        }
      );
    }
  }
}

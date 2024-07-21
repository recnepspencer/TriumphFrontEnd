import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FieldsService } from 'src/app/services/fields/fields.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SharedModule } from '../../shared/shared.module';
import { forkJoin } from 'rxjs';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FieldDetailsComponent implements OnInit {
  @Input() field: any;
  tasks: any[] = [];
  irrigationTypes: any = [];
chevronBackOutline = chevronBackOutline;


  constructor(
    private modalController: ModalController,
    private fieldsService: FieldsService,
    private scheduleService: ScheduleService
  ) { 
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {
    console.log('Field data:', this.field);
    console.log('Irrigation type IDs:', this.field.irrigationType);
    if (this.field) {
      this.loadTasks();
      this.loadIrrigationTypes();
    }
  }

  loadTasks() {
    this.scheduleService.index().subscribe(
      (allTasks) => {
        this.tasks = allTasks.filter((task: any) => task.field._id === this.field._id);
        console.log('Filtered tasks:', this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  loadIrrigationTypes() {
    const irrigationObservables = this.field.irrigationType.map((id: string) => 
      this.fieldsService.getIrrigationType(id)
    );

    forkJoin(irrigationObservables).subscribe(
      (irrigationTypes) => {
        this.irrigationTypes = irrigationTypes;
        console.log('Loaded irrigation types:', this.irrigationTypes);
      },
      (error) => {
        console.error('Error fetching irrigation types', error);
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
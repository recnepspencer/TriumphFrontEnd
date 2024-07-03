import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FieldsService } from 'src/app/services/fields/fields.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { SharedModule } from '../../shared/shared.module';
import { DropdownComponent } from '../../shared/ui/dropdown-menu/dropdown-menu.component';
import { CustomInputComponent } from '../../shared/ui/custom-input/custom-input.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [SharedModule, DropdownComponent, CustomInputComponent]
})
export class AddTaskComponent implements OnInit {
  taskName: string = '';
  selectedField: string = '';
  selectedCategory: string = '';
  scheduledTime: Date = new Date(new Date().toLocaleString());
  fields: any[] = [];
  categories: string[] = ['Irrigation', 'Fertilizer', 'Pesticide', 'Harvest', 'Planting', 'Other'];
  categoryOptions: Array<{ value: string, label: string }> = [];
  fieldOptions: Array<{ value: string, label: string }> = [];

  constructor(
    private modalController: ModalController,
    private fieldsService: FieldsService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.loadFields();
    this.populateCategoryOptions();
  }

  loadFields() {
    this.fieldsService.index().subscribe(fields => {
      this.fields = fields;
      this.populateFieldOptions();
    });
  }

  populateCategoryOptions() {
    this.categoryOptions = this.categories.map(category => ({
      value: category,
      label: category
    }));
  }

  populateFieldOptions() {
    this.fieldOptions = this.fields.map(field => ({
      value: field._id,
      label: field.name
    }));
  }

  onCategoryChange(selectedValue: any) {
    this.selectedCategory = selectedValue;
  }

  onFieldChange(selectedValue: any) {
    this.selectedField = selectedValue;
  }

  async close() {
    await this.modalController.dismiss();
  }

  updateScheduledTime(value: any) {
    this.scheduledTime = new Date(value);
  }

  async addTask() {
    const task = {
      name: this.taskName,
      field: this.selectedField,
      category: this.selectedCategory,
      timeScheduled: this.scheduledTime
    };

    this.scheduleService.create(task).subscribe(async () => {
      await this.modalController.dismiss();
    });
  }
}

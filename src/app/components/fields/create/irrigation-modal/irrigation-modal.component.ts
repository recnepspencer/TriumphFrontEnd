import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-irrigation-modal',
  templateUrl: './irrigation-modal.component.html',
  styleUrls: ['./irrigation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class IrrigationModalComponent {
  @Input() irrigationTypes: any[] = [];

  constructor(private modalController: ModalController) {}

  selectIrrigationType(irrigation: any) {
    this.modalController.dismiss(irrigation);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DropdownComponent {
  @Input() items: Array<{ value: any, label: string }> = [];
  @Input() label: string = '';
  @Input() defaultText: string = 'Select an option';
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  dropdownOpen: boolean = false;
  selectedValue: any;
  selectedLabel: string = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(item: { value: any, label: string }) {
    this.selectedValue = item.value;
    this.selectedLabel = item.label;
    this.selectionChange.emit(this.selectedValue);
    this.dropdownOpen = false;
  }

  hasSelection() {
    return !!this.selectedLabel;
  }
}

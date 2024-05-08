import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TestComponent,
    IonicModule
  ]
})
export class SharedModule {

}

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [IonicModule, SharedModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}


  test() {
    console.log('test');
  }

}

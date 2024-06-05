import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

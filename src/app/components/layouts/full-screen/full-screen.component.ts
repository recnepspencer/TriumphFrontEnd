import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-full-screen',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

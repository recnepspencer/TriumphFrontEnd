import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [IonicModule, SharedModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})

export class TestComponent  implements OnInit {

  constructor(private userService: UserService) { }


  ngOnInit() {}

  loadusers(): void {
    this.userService.getUser().subscribe((data) => {
      console.log(data);
    });
  }

  test() {
    console.log('test');
  }

  onLoadUsers(){
    this.loadusers();
  }
}

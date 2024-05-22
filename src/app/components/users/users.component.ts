import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent  implements OnInit {

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {}

  loadusers(): void {
    this.userService.index().subscribe((data) => {
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

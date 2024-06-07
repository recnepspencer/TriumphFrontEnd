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
  users: any;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {}

  loadusers(): void {
    this.userService.index().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  onLoadUsers(){
    this.loadusers();
  }

  getUser(id: any){
    console.log(id);
    this.userService.show(id).subscribe((data) => {
      console.log(data);
    });
  }

  onGetUser(id: any){
    console.log(id);
    this.getUser(id);
  }
}

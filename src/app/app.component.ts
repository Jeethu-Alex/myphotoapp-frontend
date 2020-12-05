import { Component } from '@angular/core';
import { User } from 'firebase';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotApplication';

  constructor(public userService: UserService) {
  
   }
   
   currentUser = this.userService.user;

  logout(){
    console.log("User tried to log out")
    this.userService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;

  uname: string;
  email: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  
  makeSignInFormVisible(){
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible(){
    this.signInFormVisible = false;
  }

  login(){
    console.log("User tried to login!")
    this.userService.login(this.email, this.password);
    this.email = "";
    this.password = "";
  }

  signup(){
    console.log("User tried to signup!")
    this.userService.signup(this.email, this.password, this.uname);
    this.email = "";
    this.password = "";
  }

  

}

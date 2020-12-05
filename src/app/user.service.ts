import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  user: Observable<firebase.User>;
  defaultProfilePhoto: string = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"

  
  constructor(public firebaseAuth: AngularFireAuth, private router: Router, public http: HttpClient) {
    this.user = firebaseAuth.authState;
  

    console.log("User Id Token at the construction of the Service", localStorage.getItem('userIdToken'));

    this.user.subscribe(
      userInfo =>{ 
      console.log("User Info is available", userInfo);
      this.saveIdToken(userInfo);
    }
    )
  }

  canActivate(): boolean{
    if(this.firebaseAuth.auth.currentUser != null){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }


  saveIdToken(firebaseUser: firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("IdToken Value: ", localStorage.getItem('userIdToken'));
      } 
    )
  }

  signup(email: string, password: string, uname: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success signup!', value);
        this.saveIdToken(value.user)
        this.registerUser(email,uname);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  registerUser(email: string, uname: string){
    var user: User ={
      email:	email,
      id:	"",
      name:	uname,
      profilePhotoUrl: this.defaultProfilePhoto
    };
    this.http.post(environment.API_BASE_URL+ "/users/user", user)
    .subscribe(response =>{
      console.log('Success registration!');
      this.router.navigate(['photos']);
    })
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user)
        this.router.navigate(['photos'])
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  } 

  logout() {
    localStorage.clear();
    this.firebaseAuth
      .auth
      .signOut();
      this.router.navigate(['login'])
  }
}

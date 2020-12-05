import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(public http: HttpClient) { }

  getAllPhotos(){
    var headers = this.getHeaders();
    console.log("Calling getAllPhotos method with header", headers)
    return this.http.get(environment.API_BASE_URL+ "/photos/all", {headers});
  }

  getHeaders(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}

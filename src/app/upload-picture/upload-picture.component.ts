import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {
  albumId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getId(albumId:string){
    return this.http.get("['/upload/']" + albumId);
  
      }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.albumId = params.get('albumId');
      console.log('Got album Id for upload:', this.albumId);
    })
  }

}

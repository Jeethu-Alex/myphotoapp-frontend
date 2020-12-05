import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  albumId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }
  
  
  get(albumId:string){
    return this.http.get("['/album/']" + albumId);
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params=>{
      this.albumId = params.get('albumId');
      console.log('Got album Id:', this.albumId);
    })  
    }


}


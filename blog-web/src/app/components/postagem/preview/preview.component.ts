import { Component, Input, OnInit } from '@angular/core';
import { IPostagem } from 'src/app/interfaces/IPostagem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})

export class PreviewComponent implements OnInit {

  @Input() postagens : IPostagem[] = [];

  urlServer : string = '';
  deuLike : boolean = false;
  deuDeslike : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.urlServer = environment.API+"/postagem/imagem/";
  }

  like(id:any){
    this.deuLike = !this.deuLike;
    this.deuDeslike = false;
  }

  deslike(id:any){
    this.deuLike = false;
    this.deuDeslike = !this.deuDeslike;
  }

  hoverLike(e:any){
    if(!(this.deuDeslike || this.deuLike)){
      e.srcElement.classList.toggle("far");
      e.srcElement.classList.toggle("fas");
      e.srcElement.classList.toggle("text-primary");
    }
  }

  hoverDeslike(e:any){
    if(!(this.deuDeslike || this.deuLike)){
      e.srcElement.classList.toggle("far");
      e.srcElement.classList.toggle("fas");
      e.srcElement.classList.toggle("text-danger");
    }
  }

}

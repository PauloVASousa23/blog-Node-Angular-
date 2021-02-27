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

  constructor() { }

  ngOnInit(): void {
    this.urlServer = environment.API+"/postagem/imagem/";
  }

}

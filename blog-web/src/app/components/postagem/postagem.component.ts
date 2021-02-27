import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {
  titulo : string = '';
  imagem : string = '';
  conteudo : string = '';
  postagem : any;

  constructor(private activeRoute : ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
    this.postagem = this.activeRoute.snapshot.data.postagem[0];
    this.titulo = this.postagem.Titulo;
    this.imagem = environment.API+"/postagem/imagem/" + this.postagem.Imagem;
    this.conteudo = this.postagem.Conteudo;
  }

  voltar(){
    this.location.back();
  }

}

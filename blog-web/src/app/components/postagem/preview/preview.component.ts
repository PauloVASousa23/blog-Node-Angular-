import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IPostagem } from 'src/app/interfaces/IPostagem';
import { PostagemService } from 'src/app/services/postagem.service';
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
  id : string = '';

  constructor(private postagemService: PostagemService, private cookie : CookieService) { }

  ngOnInit(): void {
    this.urlServer = environment.API+"/postagem/imagem/";
    this.id = btoa(this.cookie.get('autenticado'));
  }

  like(id:any, like: boolean, deslike: boolean){
    if(!deslike){
      this.enviarAvaliacao(true, like, id);
    }
  }

  deslike(id:any, like: boolean, deslike: boolean){
    if(!like){
      this.enviarAvaliacao(false, deslike, id);
    }
  }

  hoverLike(e:any, like: boolean, deslike: boolean){
    if(!(like || deslike)){
      e.srcElement.classList.toggle("far");
      e.srcElement.classList.toggle("fas");
      e.srcElement.classList.toggle("text-primary");
    }
  }

  hoverDeslike(e:any, like: boolean, deslike: boolean){
    if(!(deslike || like)){
      e.srcElement.classList.toggle("far");
      e.srcElement.classList.toggle("fas");
      e.srcElement.classList.toggle("text-danger");
    }
  }

  enviarAvaliacao(acao:boolean,remover:boolean, id:any){
    console.log(this.postagens);
    this.postagemService.avaliarPostagem(id,acao,remover).subscribe(x=>{
      console.log(x);
      this.postagens.forEach(postagem=>{
        if(postagem._id == id && !remover){
          postagem.Like.push(this.id);
        }else{
          postagem.Like.pop();
        }
      });

    });
  }

}

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
      e.srcElement.classList.toggle("text-primary");
    }
  }

  hoverDeslike(e:any, like: boolean, deslike: boolean){
    if(!(deslike || like)){
      e.srcElement.classList.toggle("text-danger");
    }
  }

  enviarAvaliacao(acao:boolean,remover:boolean, id:string){
    if(this.id){
      this.postagemService.avaliarPostagem(id,acao,remover).subscribe(x=>{
        this.itemArrayPostagem(acao,remover,id);
      });
    }else{
      alert('Entre com uma conta para poder avaliar os posts!');
    }
  }

  itemArrayPostagem(acao:boolean, remover:boolean, id:string ){
    this.postagens.forEach(x=>{
      //Like
      if(acao){
        if(x._id == id){
          //adiciona
          if(!remover){
            x.Like.push(this.id);
          //remove
          }else{
            let indice = x.Like.indexOf(this.id);
            if(indice > -1){
              x.Like.splice(indice, 1);
            }
          }
        }

      //Deslike
      }else{
        if(x._id == id){
          //adiciona
          if(!remover){
            x.Deslike.push(this.id);
          //remove
          }else{
            let indice = x.Deslike.indexOf(this.id);
            if(indice > -1){
              x.Deslike.splice(indice, 1);
            }
          }
        }
      }
    });
  }

}

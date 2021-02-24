import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {
  titulo : string = '';
  imagem : string = '';
  conteudo : string = '';

  constructor(private postagemService: PostagemService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : any)=>{
        this.postagemService.getPostagem(params.id).subscribe((data : any)=>{
          this.titulo = data[0].Titulo;
          this.imagem = data[0].Imagem;
          this.conteudo = data[0].Conteudo;
        });
      }
    );
  }

}

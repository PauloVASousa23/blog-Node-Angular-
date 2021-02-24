import { Component, OnInit } from '@angular/core';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  postagens : any;

  constructor(private postagemService : PostagemService) { }

  ngOnInit(): void {
    this.postagemService.getPostagens().subscribe(data=>{
      this.postagens = data;
    });
  }

  excluirPostagem(id:string){
    this.postagemService.excluirPostagem(id).subscribe(data=>{
      console.log(data);
    });
  }

}

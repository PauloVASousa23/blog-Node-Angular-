import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  postagens : any;

  constructor(
    private postagemService : PostagemService,
    private activeRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.postagens = this.activeRoute.snapshot.data.postagens;
  }

  excluirPostagem(id:string){
    this.postagemService.excluirPostagem(id).subscribe(data=>{
      console.log(data);
    });
  }

}

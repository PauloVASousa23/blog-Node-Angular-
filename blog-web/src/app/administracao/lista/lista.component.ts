import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlerta } from 'src/app/interfaces/IAlerta';
import { AlertasService } from 'src/app/services/alertas.service';
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
    private activeRoute : ActivatedRoute,
    private alerta : AlertasService
    ) { }

  ngOnInit(): void {
    this.postagens = this.activeRoute.snapshot.data.postagens;
  }

  excluirPostagem(id:string){

    this.alerta.mostrarAlerta({Titulo: "Deletar postagem?", Conteudo: "Deseja realmente excluir esta postagem?", BotaoCancelar : true, BotaoConfirmar : true} as IAlerta)
      .subscribe((result)=>{
       if(result){
         this.postagemService.excluirPostagem(id).subscribe(data=>{
           if(data == "Postagem deletada com sucesso!"){
              this.alerta.mostrarAlerta({Conteudo: "Post excluido com sucesso!", Cor: '#ffbec4', Timeout: 2000} as IAlerta);
              this.atualizarLista();
           }
         });
       }
      });

  }

  atualizarLista(){
    this.postagemService.getPostagens().subscribe(data => {this.postagens = data});
  }

}

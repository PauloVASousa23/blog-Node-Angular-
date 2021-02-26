import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  getPostagens(){
    return this.http.get(`${environment.API}/postagem`);
  }

  getPostagem(id : string){
    return this.http.get(`${environment.API}/postagem/${id}`);
  }

  cadastrarPostagem(titulo : string, imagem : string, conteudo : string, autor : string){
    return this.http.post(`${environment.API}/postagem`, {titulo: titulo, imagem: imagem, conteudo: conteudo, autor: autor});
  }

  cadastrarPostagemFile(titulo : string, imagem : Set<File>, conteudo : string, autor : string){

    const formData = new FormData();
    imagem.forEach(x=>{
      formData.append('imagem', x, x.name);
    });

    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('autor', autor);

    return this.http.post(`${environment.API}/postagem/upload/Arquivo`, formData, {responseType : 'blob'});
  }

  alterarPostagem(id: string, titulo : string, imagem : string, conteudo : string, autor : string){
    return this.http.put(`${environment.API}/postagem`, {id: id, titulo: titulo, imagem: imagem, conteudo: conteudo, autor: autor})
      .pipe(
        take(1)
      );
  }

  excluirPostagem(id : string){
    return this.http.delete(`${environment.API}/postagem/${id}`);
  }
}

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../interfaces/IUsuario';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  obterUsuarios() {
    return this.http.get<IUsuario[]>(`${environment.API}/usuario`);
  }

  obterUsuario(id:any) {
    return this.http.post<IUsuario>(`${environment.API}/usuario/obter`, {id: id});
  }

  cadastrarUsuario(nome : string,email : string, senha: string){
    return this.http.post<IUsuario>(`${environment.API}/usuario`, {nome: nome, email : email, senha: senha});
  }

  alterarUsuario(id : string, nome : string, email : string, descricao : string){
    return this.http.put<IUsuario>(`${environment.API}/usuario`, {id: id, nome: nome, email : email, descricao : descricao});
  }

  autenticarUsuario(email : string, senha : string){
    return this.http.post<IUsuario>(`${environment.API}/usuario/autenticar`, {email : email, senha: senha});
  }

  alterarImagem(id : string, file: Set<File>){
    console.log(file);
    const formData = new FormData();

    file.forEach(x=>{
      console.log(x);
      formData.append('imagem', x, x.name);
    });

    formData.append('id', id);

    console.log(formData);

    return this.http.put<IUsuario>(`${environment.API}/usuario/imagem`, formData);
  }

  logout(){
    window.localStorage.removeItem('data');
    this.cookie.delete('autenticado');
    this.router.navigate(['/Login']);
  }
}

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../interfaces/IUsuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  obterUsuario():any {
    return this.http.get<IUsuario[]>('http://localhost:3000/usuario');
  }

  cadastrarUsuario(nome : string,email : string, senha: string){
    return this.http.post<IUsuario>('http://localhost:3000/usuario', {nome: nome, email : email, senha: senha});
  }

  autenticarUsuario(email : string, senha : string){
    return this.http.post<IUsuario>('http://localhost:3000/usuario/autenticar', {email : email, senha: senha});
  }

  logout(){
    this.cookie.delete('autenticado');
    this.router.navigate(['/Login']);
  }
}

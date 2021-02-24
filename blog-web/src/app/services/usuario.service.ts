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

  obterUsuario():any {
    return this.http.get<IUsuario[]>(`${environment.API}/usuario`);
  }

  cadastrarUsuario(nome : string,email : string, senha: string){
    return this.http.post<IUsuario>(`${environment.API}/usuario`, {nome: nome, email : email, senha: senha});
  }

  autenticarUsuario(email : string, senha : string){
    return this.http.post<IUsuario>(`${environment.API}/usuario/autenticar`, {email : email, senha: senha});
  }

  logout(){
    this.cookie.delete('autenticado');
    this.router.navigate(['/Login']);
  }
}

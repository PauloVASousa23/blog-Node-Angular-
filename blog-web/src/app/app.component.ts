import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  nome : string = '';

  constructor(private usuarioService: UsuarioService, private cookie : CookieService){};

  ngOnInit(){
    if(this.estaLogado()){
      console.log(JSON.parse(window.localStorage.getItem('data') || "")[0].Nome);
      this.nome = JSON.parse(window.localStorage.getItem('data') || "")[0].Nome;
    }
  }

  logout(){
    this.usuarioService.logout();
  }

  estaLogado(){
    return this.cookie.get('autenticado');
  }

}

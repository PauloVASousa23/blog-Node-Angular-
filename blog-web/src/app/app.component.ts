import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  nome : string = '';
  imagemPerfil : string = '';

  constructor(private usuarioService: UsuarioService, private cookie : CookieService, private router : Router){
    router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        if(this.estaLogado()){
          this.nome = JSON.parse(window.localStorage.getItem('data') || "").Nome;
          this.imagemPerfil = environment.API + "/usuario/imagem/" + btoa(this.cookie.get('autenticado'));
        }
      }
    });
  };

  ngOnInit(){
  }

  logout(){
    this.usuarioService.logout();
  }

  estaLogado(){
    return this.cookie.get('autenticado');
  }

}

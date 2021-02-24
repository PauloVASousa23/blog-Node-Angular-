import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private usuarioService: UsuarioService, private cookie : CookieService){};

  logout(){
    this.usuarioService.logout();
  }

  estaLogado(){
    return this.cookie.get('autenticado');
  }

}

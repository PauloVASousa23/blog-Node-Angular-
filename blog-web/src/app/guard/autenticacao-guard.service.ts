import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../services/usuario.service';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuardService implements CanActivate{

  constructor(private cookie: CookieService, private usuarioService: UsuarioService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{

    if(window.localStorage.getItem('data') && this.cookie.get('autenticado').length > 0){
      return true;
    }else if(this.cookie.get('autenticado').length > 0){
      let id = btoa(this.cookie.get('autenticado'));
      this.usuarioService.obterUsuario(id).subscribe((usuario : IUsuario[])=>{
        usuario[0]._id = "";
        window.localStorage.setItem('data', JSON.stringify(usuario).replace(usuario[0]._id,""));
      });
      return true;
    }else{
      return false;
    }
  };

}

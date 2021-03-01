import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ListaComponent } from '../administracao/lista/lista.component';
import { PostagemService } from '../services/postagem.service';

@Injectable({
  providedIn: 'root'
})
export class PostagemResolver implements Resolve<any>{

  constructor(private postagemService: PostagemService, private cookie : CookieService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if(route.routeConfig?.component == ListaComponent){
      return this.postagemService.getPostagensAutor(btoa(this.cookie.get('autenticado')));
    }
    if(route.params.id){
      return this.postagemService.getPostagem(route.params.id);
    }else {
      return this.postagemService.getPostagens();
    }

  }
}

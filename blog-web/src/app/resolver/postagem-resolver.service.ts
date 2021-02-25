import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostagemService } from '../services/postagem.service';

@Injectable({
  providedIn: 'root'
})
export class PostagemResolver implements Resolve<any>{

  constructor(private postagemService: PostagemService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if(route.params.id){
      return this.postagemService.getPostagem(route.params.id);
    }else {
      return this.postagemService.getPostagens();
    }

  }
}

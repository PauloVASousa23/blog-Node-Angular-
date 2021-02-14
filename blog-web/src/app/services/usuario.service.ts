import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  obterUsuario(){
    this.http.get<IUsuario[]>('localhost:3000/usuario').subscribe((data : any)=>{
      console.log(data);
    });
  }

  cadastrarUsuario(usuario : IUsuario){

  }
}

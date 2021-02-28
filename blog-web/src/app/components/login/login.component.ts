import { IAlerta } from './../../interfaces/IAlerta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { UsuarioService } from './../../services/usuario.service';
import { AlertasService } from 'src/app/services/alertas.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin : any;

  constructor(
    private fb : FormBuilder,
    private usuarioService : UsuarioService,
    private cookie: CookieService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email : ['', [Validators.email, Validators.required]],
      senha : ['', [Validators.required]]
    });
  }

  autenticarUsuario(){
    if(this.formLogin.valid){
      this.usuarioService.autenticarUsuario(this.formLogin.get('email').value,this.formLogin.get('senha').value)
        .subscribe((data : any) =>{
          if(data){
            console.log(data);
            this.cookie.set('autenticado', atob(data._id).replace('%B', '2'));
            this.route.navigate(['/administracao']);
          }else{
            alert("E-mail ou senha invalida");
          }
        });
    }else{
      Object.keys(this.formLogin.value).forEach(campo=>{
        try{
          this.formLogin.get(campo).markAsTouched();
        }catch(e){}
      });
    }
  }

  validarSeValidoTouched(campo : string){
    return this.formLogin.get(campo).invalid && this.formLogin.get(campo).touched;
  }

}

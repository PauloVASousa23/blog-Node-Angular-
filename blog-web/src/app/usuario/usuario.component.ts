import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formUsuario : any;
  imagemPerfil : string = '';
  files: Set<File> = new Set();

  get ctNome(){
    return this.formUsuario.get('nome');
  }

  get ctEmail(){
    return this.formUsuario.get('email');
  }

  get ctDescricao(){
    return this.formUsuario.get('descricao');
  }

  constructor(
    private usuarioService : UsuarioService,
    private cookie : CookieService,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      nome : ['', [Validators.required]],
      email : ['', [Validators.required]],
      descricao : ['', [Validators.required]]
    });

    this.usuarioService.obterUsuario(btoa(this.cookie.get('autenticado'))).subscribe((usuario)=>{
      this.formUsuario.get('nome').setValue(usuario.Nome);
      this.formUsuario.get('email').setValue(usuario.Email);
      this.formUsuario.get('descricao').setValue(usuario.Descricao);
      this.imagemPerfil =  environment.API + "/usuario/imagem/" + usuario._id;
    });
  }

  salvar(){
    console.log(this.formUsuario);
    if(this.formUsuario.valid){
      this.usuarioService.alterarUsuario(btoa(this.cookie.get('autenticado')), this.ctNome.value, this.ctEmail.value, this.ctDescricao.value)
        .subscribe(x=>{
          console.log(x);
        });
    }
  }

  cliqueAlterarImagem(){
    document.getElementById("inputImagem")?.click();
  }

  alterarImagem(e:any){

    for(let i = 0; i<e.srcElement.files.length;i++){
      this.files.add(e.srcElement.files[i]);
    }

    this.usuarioService.alterarImagem(btoa(this.cookie.get('autenticado')), this.files)
      .subscribe(x=>{
        console.log(x);
      });
  }

}

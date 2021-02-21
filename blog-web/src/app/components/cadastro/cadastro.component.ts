import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastro : any;

  constructor(private usuarioService : UsuarioService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      nome : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      senha : ['', [Validators.required]],
      reSenha : ['', [Validators.required]]
    });
  }

  cadastrar(){
    this.usuarioService.cadastrarUsuario(this.formCadastro.get('nome').value, this.formCadastro.get('email').value, this.formCadastro.get('senha').value)
      .subscribe(data=>{
        console.log(data);
      });
  }

}

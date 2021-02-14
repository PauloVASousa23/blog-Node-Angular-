import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

  cadastrar(){
    this.usuarioService.obterUsuario();
  }

}

import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuarioService : UsuarioService) { }

  usuarios : IUsuario[] = [];

  ngOnInit(): void {
    this.usuarioService.obterUsuario().subscribe((data : IUsuario[])=>{
      this.usuarios = data;
    });
  }

}

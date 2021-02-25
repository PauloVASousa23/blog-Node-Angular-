import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostagem } from 'src/app/interfaces/IPostagem';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { PostagemService } from 'src/app/services/postagem.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute) { }

  postagens : IPostagem[] = [];

  ngOnInit(): void {

    this.postagens = this.activeRoute.snapshot.data.postagens;

  }

}

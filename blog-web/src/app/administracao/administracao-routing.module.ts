import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracaoComponent } from './administracao.component';
import { CriarComponent } from './criar/criar.component';
import { ListaComponent } from './lista/lista.component';
import { PostagemComponent } from '../components/postagem/postagem.component';
import { EditarComponent } from './editar/editar.component';
import { PostagemResolver } from '../resolver/postagem-resolver.service';

const routes = [
  {path: '', component: AdministracaoComponent,
    children: [
      {path: '', component: ListaComponent, resolve: {postagens : PostagemResolver}},
      {path: 'criar', component: CriarComponent},
      {path: 'editar/:id', component: EditarComponent, resolve: {postagem : PostagemResolver}},
      {path: ':id', component: PostagemComponent, resolve: {postagem : PostagemResolver}},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdministracaoRoutingModule { }

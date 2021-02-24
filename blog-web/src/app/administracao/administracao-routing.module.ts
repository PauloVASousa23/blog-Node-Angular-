import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracaoComponent } from './administracao.component';
import { CriarComponent } from './criar/criar.component';
import { ListaComponent } from './lista/lista.component';
import { PostagemComponent } from '../components/postagem/postagem.component';
import { EditarComponent } from './editar/editar.component';

const routes = [
  {path: '', component: AdministracaoComponent,
    children: [
      {path: '', component: ListaComponent},
      {path: 'criar', component: CriarComponent},
      {path: 'editar/:id', component: EditarComponent},
      {path: ':id', component: PostagemComponent},
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

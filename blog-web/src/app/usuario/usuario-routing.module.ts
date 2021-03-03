import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { RouterModule } from '@angular/router';
import { AutenticacaoGuardService } from '../guard/autenticacao-guard.service';

const routes = [
  {path:'', component: UsuarioComponent, canActivate: [AutenticacaoGuardService]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuarioRoutingModule { }

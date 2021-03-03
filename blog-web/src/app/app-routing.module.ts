import { PostagemComponent } from './components/postagem/postagem.component';
import { PostagemResolver } from './resolver/postagem-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HelpComponent } from './components/help/help.component';
import { AutenticacaoGuardService } from './guard/autenticacao-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, resolve: {postagens : PostagemResolver}},
  {path: 'Post/:id', component: PostagemComponent, resolve: {postagem : PostagemResolver}},
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastre-se', component: CadastroComponent},
  {path: 'help', component: HelpComponent, canActivate: [AutenticacaoGuardService]},
  {path: 'administracao', loadChildren: ()=> import('./administracao/administracao-routing.module').then(m => m.AdministracaoRoutingModule), canActivate: [AutenticacaoGuardService]},
  {path: 'usuario', loadChildren: ()=> import('./usuario/usuario-routing.module').then(m => m.UsuarioRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

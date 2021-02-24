import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HelpComponent } from './components/help/help.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { CriarComponent } from './administracao/criar/criar.component';
import { ListaComponent } from './administracao/lista/lista.component';
import { PostagemComponent } from './components/postagem/postagem.component';
import { EditarComponent } from './administracao/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    NavbarComponent,
    HomeComponent,
    CadastroComponent,
    AdministracaoComponent,
    CriarComponent,
    ListaComponent,
    PostagemComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

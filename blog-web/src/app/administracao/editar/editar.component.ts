import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { PostagemService } from 'src/app/services/postagem.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  formPostagem : any;
  previewImage : any = {
    link : '',
    arquivo: '',
    nome: ''
  };
  idPostagem : string = '';

  postagem : any;
  urlServer : string = '';

  constructor(
    private fb : FormBuilder,
    private router: ActivatedRoute,
    private rota : Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(): void {
    this.formPostagem = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      conteudo: ['', [Validators.required, Validators.minLength(50)]],
      imagem: ['']
    });

    this.postagem = this.router.snapshot.data.postagem[0];

    this.ctTitulo.setValue(this.postagem.Titulo);
    this.ctImagem.setValue(this.postagem.Imagem);
    this.ctConteudo.setValue(this.postagem.Conteudo);
    this.previewImage.link = this.postagem.Imagem;
    this.idPostagem = this.postagem._id;

    this.urlServer = environment.API+"/postagem/imagem/";

  }

  alterar(){
    if(this.formPostagem.valid){
      this.formPostagem.get('imagem').setValue(this.previewImage.link);
      this.postagemService.alterarPostagem(this.idPostagem, this.ctTitulo.value, this.ctImagem.value, this.ctConteudo.value, "Paulo")
        .subscribe(x=>{if(x == 'Postagem alterada com sucesso!') this.rota.navigate(['/administracao'])});
    }
  }

  cliqueNaImagem(){
    document.getElementById("inputFile")?.click();
  }

  previewImagem(event : any){
    let reader = new FileReader();
    reader.onload = (_event: any)=>{
      this.previewImage = {
        link: _event.target.result,
        arquivo: event.srcElement.files[0],
        nome: event.srcElement.files[0].name
      };
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  get ctTitulo(){
    return this.formPostagem.get('titulo');
  }

  get ctImagem(){
    return this.formPostagem.get('imagem');
  }

  get ctConteudo(){
    return this.formPostagem.get('conteudo');
  }

}

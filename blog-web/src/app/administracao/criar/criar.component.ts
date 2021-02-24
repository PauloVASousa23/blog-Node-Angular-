import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostagemService } from 'src/app/services/postagem.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {

  formPostagem : any;
  previewImage : any;

  constructor(
    private fb : FormBuilder,
    private postagemService: PostagemService,
    private route : Router
    ) { }

  ngOnInit(): void {
    this.formPostagem = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      conteudo: ['', [Validators.required, Validators.minLength(50)]],
      imagem: ['']
    });
  }

  cadastrar(){
    if(this.formPostagem.valid){
      this.formPostagem.get('imagem').setValue(this.previewImage.link);
      console.log(this.formPostagem);
      this.postagemService.cadastrarPostagem(this.formPostagem.get('titulo').value, this.formPostagem.get('imagem').value, this.formPostagem.get('conteudo').value, "Paulo")
        .pipe(
          tap((x : any)=>console.log(x))
        )
        .subscribe(x=>{if(x == 'Postagem cadastrada com sucesso!') this.route.navigate(['/administracao'])});
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
}

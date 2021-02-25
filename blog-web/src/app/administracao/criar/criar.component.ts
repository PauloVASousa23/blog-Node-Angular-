import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostagemService } from 'src/app/services/postagem.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { IAlerta } from 'src/app/interfaces/IAlerta';

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
    private route : Router,
    private alerta : AlertasService
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
        .subscribe(x=>{if(x == 'Postagem cadastrada com sucesso!') {
          this.alerta.mostrarAlerta({Conteudo: "Post criado com sucesso!", Cor: '#90eca5',Timeout: 2000, BarraTimer: true} as IAlerta);
          this.route.navigate(['/administracao'])
        }
      });
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

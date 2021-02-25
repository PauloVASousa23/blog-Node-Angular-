import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { time } from 'console';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sem-acao',
  templateUrl: './sem-acao.component.html',
  styleUrls: ['./sem-acao.component.css']
})
export class SemAcaoComponent implements OnInit, AfterViewInit {

  @Input() titulo : string = '';
  @Input() conteudo : string = '';
  @Input() cor : string = '#fff';
  @Input() botaoCancelar : boolean = false;
  @Input() textoBotaoCancelar : string = 'Cancelar';
  @Input() corBotaoCancelar : string = '';
  @Input() corTextoBotaoCancelar : string = '';
  @Input() botaoConfirmar : boolean = false;
  @Input() textoBotaoConfirmar : string = 'Confirmar';
  @Input() corBotaoConfirmar : string = '';
  @Input() corTextoBotaoConfirmar : string = '';
  @Input() corBarraTimer : string = '';
  @Input() timeout : number = 0;
  acaoBotao : Subject<boolean> = new Subject<boolean>();
  timer : number = 100;
  largura : number = 100;

  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.timeout > 0){
      this.startTimer();
    }
  }

  cancelar(){
    this.acaoBotao?.next(false);
    this.activeModal.close();
  }

  confirmar(){
    this.acaoBotao?.next(true);
    this.activeModal.close();
  }

  startTimer(){
    this.timer = this.timeout / 1000;
    document.getElementById("timer")!.style.transition = "all " + this.timer+"s cubic-bezier(0.24, 0.29, 0.74, 0.76) 0s";
    setTimeout(() =>{
      document.getElementById("timer")!.style.width = '0%';
    },100);

    setTimeout(() =>{
      this.activeModal.close();
    },this.timeout);
  }

}

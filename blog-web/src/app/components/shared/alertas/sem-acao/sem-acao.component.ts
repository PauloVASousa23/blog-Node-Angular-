import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sem-acao',
  templateUrl: './sem-acao.component.html',
  styleUrls: ['./sem-acao.component.css']
})
export class SemAcaoComponent implements OnInit {

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
  acaoBotaoConfirmar : Subject<boolean> = new Subject<boolean>();
  acaoBotaoCancelar : Subject<boolean> = new Subject<boolean>();

  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.acaoBotaoCancelar?.next(true);
    this.activeModal.close();
  }

  confirmar(){
    this.acaoBotaoConfirmar?.next(true);
    this.activeModal.close();
  }

}

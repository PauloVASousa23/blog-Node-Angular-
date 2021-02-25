import { IAlerta } from './../interfaces/IAlerta';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SemAcaoComponent } from '../components/shared/alertas/sem-acao/sem-acao.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private modalService : NgbModal) { }

  mostrarAlerta(propriedades:IAlerta){
    const modalReference = this.modalService.open(SemAcaoComponent);
    modalReference.componentInstance.conteudo = propriedades.Conteudo || '';
    modalReference.componentInstance.titulo = propriedades.Titulo || '';
    modalReference.componentInstance.cor = propriedades.Cor || '#fff';
    modalReference.componentInstance.botaoCancelar = propriedades.BotaoCancelar || false;
    modalReference.componentInstance.textoBotaoCancelar = propriedades.TextoBotaoCancelar || 'Cancelar';
    modalReference.componentInstance.corBotaoCancelar = propriedades.CorBotaoCancelar || "#9c9c9c";
    modalReference.componentInstance.corTextoBotaoCancelar = propriedades.CorTextoBotaoCancelar || "#000";
    modalReference.componentInstance.botaoConfirmar = propriedades.BotaoConfirmar || false;
    modalReference.componentInstance.textoBotaoConfirmar = propriedades.TextoBotaoConfirmar || 'Confirmar';
    modalReference.componentInstance.corBotaoConfirmar = propriedades.CorBotaoConfirmar || "#77bb6f";
    modalReference.componentInstance.corTextoBotaoConfirmar = propriedades.CorTextoBotaoConfirmar || "#fff";
    if(propriedades.BotaoConfirmar){
      return (<SemAcaoComponent>modalReference.componentInstance).acaoBotaoConfirmar;
    }else if(propriedades.BotaoCancelar){
      return (<SemAcaoComponent>modalReference.componentInstance).acaoBotaoCancelar;
    }
  }

}

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
    modalReference.componentInstance.corTextoBotaoCancelar = propriedades.CorTextoBotaoCancelar || "#fff";
    modalReference.componentInstance.botaoConfirmar = propriedades.BotaoConfirmar || false;
    modalReference.componentInstance.textoBotaoConfirmar = propriedades.TextoBotaoConfirmar || 'Confirmar';
    modalReference.componentInstance.corBotaoConfirmar = propriedades.CorBotaoConfirmar || "#77bb6f";
    modalReference.componentInstance.corTextoBotaoConfirmar = propriedades.CorTextoBotaoConfirmar || "#fff";
    modalReference.componentInstance.barraTimer = propriedades.BarraTimer || false;
    modalReference.componentInstance.timeout = propriedades.Timeout || 0;
    modalReference.componentInstance.corBarraTimer = propriedades.CorBarraTimer || '#007bff';

    return (<SemAcaoComponent>modalReference.componentInstance).acaoBotao;

  }

}

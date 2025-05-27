"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NFeWizardService_1 = __importDefault(require("@Modules/dfe/nfe/services/NFeWizard/NFeWizardService"));
class NFeWizard {
    constructor() {
        this.nfeWizardService = new NFeWizardService_1.default();
    }
    async NFE_LoadEnvironment({ config }) {
        await this.nfeWizardService.NFE_LoadEnvironment({ config });
    }
    /**
     * Status Serviço
     */
    async NFE_ConsultaStatusServico() {
        return await this.nfeWizardService.NFE_ConsultaStatusServico();
    }
    /**
     * Consulta Protocolo
     */
    async NFE_ConsultaProtocolo(chave) {
        return this.nfeWizardService.NFE_ConsultaProtocolo(chave);
    }
    /**
     * Recepção de Eventos
     */
    async NFE_RecepcaoEvento(evento) {
        return await this.nfeWizardService.NFE_RecepcaoEvento(evento);
    }
    async NFE_EventoPrevioDeEmissaoEmContingencia(evento) {
        return await this.nfeWizardService.NFE_EventoPrevioDeEmissaoEmContingencia(evento);
    }
    async NFE_Cancelamento(evento) {
        return await this.nfeWizardService.NFE_Cancelamento(evento);
    }
    async NFE_CienciaDaOperacao(evento) {
        return await this.nfeWizardService.NFE_CienciaDaOperacao(evento);
    }
    async NFE_ConfirmacaoDaOperacao(evento) {
        return await this.nfeWizardService.NFE_ConfirmacaoDaOperacao(evento);
    }
    async NFE_OperacaoNaoRealizada(evento) {
        return await this.nfeWizardService.NFE_OperacaoNaoRealizada(evento);
    }
    async NFE_CartaDeCorrecao(evento) {
        return await this.nfeWizardService.NFE_CartaDeCorrecao(evento);
    }
    async NFE_DesconhecimentoDaOperacao(evento) {
        return await this.nfeWizardService.NFE_DesconhecimentoDaOperacao(evento);
    }
    /**
     * Distribuição DFe
     */
    async NFE_DistribuicaoDFe(data) {
        return await this.nfeWizardService.NFE_DistribuicaoDFe(data);
    }
    async NFE_DistribuicaoDFePorUltNSU(data) {
        return await this.nfeWizardService.NFE_DistribuicaoDFePorUltNSU(data);
    }
    async NFE_DistribuicaoDFePorNSU(data) {
        return await this.nfeWizardService.NFE_DistribuicaoDFePorNSU(data);
    }
    async NFE_DistribuicaoDFePorChave(data) {
        return await this.nfeWizardService.NFE_DistribuicaoDFePorChave(data);
    }
    /**
     * Autorização
     */
    async NFE_Autorizacao(data) {
        return await this.nfeWizardService.NFE_Autorizacao(data);
    }
    async NFCE_Autorizacao(data) {
        return await this.nfeWizardService.NFCE_Autorizacao(data);
    }
    /**
     * Inutilização
     */
    async NFE_Inutilizacao(data) {
        return await this.nfeWizardService.NFE_Inutilizacao(data);
    }
    /**
     * DANFE
     */
    async NFE_GerarDanfe(data) {
        return await this.nfeWizardService.NFE_GerarDanfe(data);
    }
    async NFCE_GerarDanfe(data) {
        return await this.nfeWizardService.NFCE_GerarDanfe(data);
    }
    /**
     * Método para envio de e-mail
     * @param {EmailParams} mailParams - Mensagem de texto (aceita html)
     */
    NFE_EnviaEmail(mailParams) {
        return this.nfeWizardService.NFE_EnviaEmail(mailParams);
    }
}
exports.default = NFeWizard;
//# sourceMappingURL=NFeWizard.js.map
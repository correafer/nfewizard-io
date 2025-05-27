"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XmlBuilder_1 = __importDefault(require("../../../../../adapters/XmlBuilder.cjs"));
const Utility_1 = __importDefault(require("../../../../../core/utils/Utility.cjs"));
const GerarConsulta_1 = __importDefault(require("../../../../dfe/base/GerarConsulta.cjs"));
const SaveFiles_1 = __importDefault(require("../../../../dfe/base/SaveFiles.cjs"));
const Environment_1 = __importDefault(require("../../../../environment/Environment.cjs"));
const NFEStatusServicoService_1 = __importDefault(require("../../../../dfe/nfe/services/NFEStatusServico/NFEStatusServicoService.cjs"));
const NFEconsultaProtocolo_1 = __importDefault(require("../../operations/NFEConsultaProtocolo/NFEconsultaProtocolo.cjs"));
const NFEEpec_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFEEpec.cjs"));
const NFECancelamento_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFECancelamento.cjs"));
const NFECienciaDaOperacao_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFECienciaDaOperacao.cjs"));
const NFEConfirmacaoDaOperacao_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFEConfirmacaoDaOperacao.cjs"));
const NFEOperacaoNaoRealizada_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFEOperacaoNaoRealizada.cjs"));
const MailAdapter_1 = __importDefault(require("../../../../../adapters/MailAdapter.cjs"));
const NFCEGerarDanfe_1 = __importDefault(require("../../../../dfe/danfe/NFCEGerarDanfe/NFCEGerarDanfe.cjs"));
const NFEGerarDanfe_1 = __importDefault(require("../../../../dfe/danfe/NFEGerarDanfe/NFEGerarDanfe.cjs"));
const NFCEAutorizacao_1 = __importDefault(require("../../../../dfe/nfce/operations/NFCEAutorizacao/NFCEAutorizacao.cjs"));
const NFEDistribuicaoDFe_1 = __importDefault(require("../../operations/NFEDistribuicaoDFe/NFEDistribuicaoDFe.cjs"));
const NFEDistribuicaoDFePorChave_1 = __importDefault(require("../../operations/NFEDistribuicaoDFe/NFEDistribuicaoDFePorChave.cjs"));
const NFEDistribuicaoDFePorNSU_1 = __importDefault(require("../../operations/NFEDistribuicaoDFe/NFEDistribuicaoDFePorNSU.cjs"));
const NFEDistribuicaoDFePorUltNSU_1 = __importDefault(require("../../operations/NFEDistribuicaoDFe/NFEDistribuicaoDFePorUltNSU.cjs"));
const NFEInutilizacao_1 = __importDefault(require("../../operations/NFEInutilizacao/NFEInutilizacao.cjs"));
const NFECartaDeCorrecao_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFECartaDeCorrecao.cjs"));
const NFEDesconhecimentoDaOperacao_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFEDesconhecimentoDaOperacao.cjs"));
const NFEAutorizacaoService_1 = __importDefault(require("../NFEAutorizacao/NFEAutorizacaoService.cjs"));
const NFEconsultaProtocoloService_1 = __importDefault(require("../NFEConsultaProtocolo/NFEconsultaProtocoloService.cjs"));
const NFEStatusServico_1 = __importDefault(require("../../operations/NFEStatusServico/NFEStatusServico.cjs"));
const NFERecepcaoEvento_1 = __importDefault(require("../../operations/NFERecepcaoEvento/NFERecepcaoEvento.cjs"));
const NFERecepcaoEventoService_1 = __importDefault(require("../NFERecepcaoEvento/NFERecepcaoEventoService.cjs"));
const NFECancelamentoService_1 = __importDefault(require("../NFERecepcaoEvento/NFECancelamentoService.cjs"));
const NFECartaDeCorrecaoService_1 = __importDefault(require("../NFERecepcaoEvento/NFECartaDeCorrecaoService.cjs"));
const NFECienciaDaOperacaoService_1 = __importDefault(require("../NFERecepcaoEvento/NFECienciaDaOperacaoService.cjs"));
const NFEDesconhecimentoDaOperacaoService_1 = __importDefault(require("../NFERecepcaoEvento/NFEDesconhecimentoDaOperacaoService.cjs"));
const NFEEpecService_1 = __importDefault(require("../NFERecepcaoEvento/NFEEpecService.cjs"));
const NFEOperacaoNaoRealizadaService_1 = __importDefault(require("../NFERecepcaoEvento/NFEOperacaoNaoRealizadaService.cjs"));
const NFEAutorizacao_1 = __importDefault(require("../../operations/NFEAutorizacao/NFEAutorizacao.cjs"));
const NFEDistribuicaoDFeService_1 = __importDefault(require("../NFEDistribuicaoDFe/NFEDistribuicaoDFeService.cjs"));
const NFEDistribuicaoDFePorUltNSU_2 = __importDefault(require("../NFEDistribuicaoDFe/NFEDistribuicaoDFePorUltNSU.cjs"));
const NFEDistribuicaoDFePorNSU_2 = __importDefault(require("../NFEDistribuicaoDFe/NFEDistribuicaoDFePorNSU.cjs"));
const NFEDistribuicaoDFePorChave_2 = __importDefault(require("../NFEDistribuicaoDFe/NFEDistribuicaoDFePorChave.cjs"));
const NFEInutilizacaoService_1 = __importDefault(require("../NFEInutilizacao/NFEInutilizacaoService.cjs"));
const NFCEAutorizacaoService_1 = __importDefault(require("../../../../dfe/nfce/services/NFCEAutorizacao/NFCEAutorizacaoService.cjs"));
class NFeWizardService {
    constructor() {
        this.config = {};
        this.environment = {};
        this.utility = {};
        this.xmlBuilder = {};
        this.axios = {};
        this.saveFiles = {};
        this.gerarConsulta = {};
        if (new.target) {
            return new Proxy(this, {
                get(target, prop, receiver) {
                    const origMethod = target[prop];
                    if (typeof origMethod === 'function') {
                        return async function (...args) {
                            if (prop === 'NFE_LoadEnvironment') {
                                return origMethod.apply(target, args);
                            }
                            // Lógica de validação antes de cada método
                            await target.validateEnvironment(prop);
                            // Chama o método original
                            return origMethod.apply(target, args);
                        };
                    }
                    return Reflect.get(target, prop, receiver);
                }
            });
        }
    }
    async NFE_LoadEnvironment({ config }) {
        try {
            this.config = config;
            // Carrega Ambiente
            this.environment = new Environment_1.default(this.config);
            const { axios } = await this.environment.loadEnvironment();
            this.axios = axios;
            // Inicia método de Utilitários
            this.utility = new Utility_1.default(this.environment);
            this.saveFiles = new SaveFiles_1.default(this.environment, this.utility);
            // Inicia método de geração de XML
            this.xmlBuilder = new XmlBuilder_1.default(this.environment);
            this.gerarConsulta = new GerarConsulta_1.default(this.environment, this.utility, this.xmlBuilder);
            console.log('===================================');
            console.log('Biblioteca Inicializada com Sucesso');
            console.log('===================================');
        }
        catch (error) {
            console.log(error);
            throw new Error(`Erro ao inicializar a lib: ${error}`);
        }
    }
    /**
     * Status Serviço
     */
    async NFE_ConsultaStatusServico() {
        try {
            const nfeStatusServicoService = new NFEStatusServicoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeStatusServico = new NFEStatusServico_1.default(nfeStatusServicoService);
            const response = await nfeStatusServico.Exec();
            console.log('Retorno NFE_ConsultaStatusServico');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response;
        }
        catch (error) {
            throw new Error(`NFE_ConsultaStatusServico: ${error.message}`);
        }
    }
    /**
     * Consulta Protocolo
     */
    async NFE_ConsultaProtocolo(chave) {
        try {
            const nfeConsultaProtocoloService = new NFEconsultaProtocoloService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeConsultaProtocolo = new NFEconsultaProtocolo_1.default(nfeConsultaProtocoloService);
            const response = await nfeConsultaProtocolo.Exec(chave);
            console.log('Retorno NFE_ConsultaProtocolo');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response;
        }
        catch (error) {
            throw new Error(`NFE_ConsultaProtocolo: ${error.message}`);
        }
    }
    /**
     * Recepção de Eventos
     */
    async NFE_RecepcaoEvento(evento) {
        try {
            const nfeRecepcaoEventoService = new NFERecepcaoEventoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeRecepcaoEvento = new NFERecepcaoEvento_1.default(nfeRecepcaoEventoService);
            const response = await nfeRecepcaoEvento.Exec(evento);
            console.log('Retorno NFE_RecepcaoEvento');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_RecepcaoEvento: ${error.message}`);
        }
    }
    async NFE_EventoPrevioDeEmissaoEmContingencia(evento) {
        try {
            const nfeEpecService = new NFEEpecService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeEpec = new NFEEpec_1.default(nfeEpecService);
            const response = await nfeEpec.Exec(evento);
            console.log('Retorno NFEEpec');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFEEpec: ${error.message}`);
        }
    }
    async NFE_Cancelamento(evento) {
        try {
            const nfeCancelamentoService = new NFECancelamentoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeCancelamento = new NFECancelamento_1.default(nfeCancelamentoService);
            const response = await nfeCancelamento.Exec(evento);
            console.log('Retorno NFE_Cancelamento');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_Cancelamento: ${error.message}`);
        }
    }
    async NFE_CienciaDaOperacao(evento) {
        try {
            const nfeCienciaDaOperacaoService = new NFECienciaDaOperacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeCienciaDaOperacao = new NFECienciaDaOperacao_1.default(nfeCienciaDaOperacaoService);
            const response = await nfeCienciaDaOperacao.Exec(evento);
            console.log('Retorno NFE_CienciaDaOperacao');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_CienciaDaOperacao: ${error.message}`);
        }
    }
    async NFE_ConfirmacaoDaOperacao(evento) {
        try {
            const nfeConfirmacaoDaOperacaoService = new NFECienciaDaOperacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeConfirmacaoDaOperacao = new NFEConfirmacaoDaOperacao_1.default(nfeConfirmacaoDaOperacaoService);
            const response = await nfeConfirmacaoDaOperacao.Exec(evento);
            console.log('Retorno NFE_ConfirmacaoDaOperacao');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_ConfirmacaoDaOperacao: ${error.message}`);
        }
    }
    async NFE_OperacaoNaoRealizada(evento) {
        try {
            const nfeOperacaoNaoRealizadaService = new NFEOperacaoNaoRealizadaService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeOperacaoNaoRealizada = new NFEOperacaoNaoRealizada_1.default(nfeOperacaoNaoRealizadaService);
            const response = await nfeOperacaoNaoRealizada.Exec(evento);
            console.log('Retorno NFE_OperacaoNaoRealizada');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_OperacaoNaoRealizada: ${error.message}`);
        }
    }
    async NFE_CartaDeCorrecao(evento) {
        try {
            const nfeCartaDeCorrecaoService = new NFECartaDeCorrecaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeCartaDeCorrecao = new NFECartaDeCorrecao_1.default(nfeCartaDeCorrecaoService);
            const response = await nfeCartaDeCorrecao.Exec(evento);
            console.log('Retorno NFE_CartaDeCorrecao');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_CartaDeCorrecao: ${error.message}`);
        }
    }
    async NFE_DesconhecimentoDaOperacao(evento) {
        try {
            const nfeDesconhecimentoDaOperacaoService = new NFEDesconhecimentoDaOperacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const nfeDesconhecimentoDaOperacao = new NFEDesconhecimentoDaOperacao_1.default(nfeDesconhecimentoDaOperacaoService);
            const response = await nfeDesconhecimentoDaOperacao.Exec(evento);
            console.log('Retorno NFE_DesconhecimentoDaOperacao');
            console.table(response.xMotivos);
            console.log('===================================');
            return response.response;
        }
        catch (error) {
            throw new Error(`NFE_DesconhecimentoDaOperacao: ${error.message}`);
        }
    }
    /**
     * Distribuição DFe
     */
    async NFE_DistribuicaoDFe(data) {
        try {
            const distribuicaoDFeService = new NFEDistribuicaoDFeService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const distribuicaoDFe = new NFEDistribuicaoDFe_1.default(distribuicaoDFeService);
            const response = await distribuicaoDFe.Exec(data);
            console.log('Retorno NFE_DistribuicaoDFe');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response.data;
        }
        catch (error) {
            throw new Error(`NFE_DistribuicaoDFe: ${error.message}`);
        }
    }
    async NFE_DistribuicaoDFePorUltNSU(data) {
        try {
            const distribuicaoDFeService = new NFEDistribuicaoDFePorUltNSU_2.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const distribuicaoDFe = new NFEDistribuicaoDFePorUltNSU_1.default(distribuicaoDFeService);
            const response = await distribuicaoDFe.Exec(data);
            console.log('Retorno NFE_DistribuicaoDFePorUltNSU');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response.data;
        }
        catch (error) {
            throw new Error(`NFE_DistribuicaoDFePorUltNSU: ${error.message}`);
        }
    }
    async NFE_DistribuicaoDFePorNSU(data) {
        try {
            const distribuicaoDFeService = new NFEDistribuicaoDFePorNSU_2.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const distribuicaoDFe = new NFEDistribuicaoDFePorNSU_1.default(distribuicaoDFeService);
            const response = await distribuicaoDFe.Exec(data);
            console.log('Retorno NFE_DistribuicaoDFePorNSU');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response.data;
        }
        catch (error) {
            throw new Error(`NFE_DistribuicaoDFePorNSU: ${error.message}`);
        }
    }
    async NFE_DistribuicaoDFePorChave(data) {
        try {
            const distribuicaoDFeService = new NFEDistribuicaoDFePorChave_2.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const distribuicaoDFe = new NFEDistribuicaoDFePorChave_1.default(distribuicaoDFeService);
            const response = await distribuicaoDFe.Exec(data);
            console.log('Retorno NFE_DistribuicaoDFePorChave');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response.data;
        }
        catch (error) {
            throw new Error(`NFE_DistribuicaoDFePorChave: ${error.message}`);
        }
    }
    /**
     * Autorização
     */
    async NFE_Autorizacao(data) {
        try {
            const autorizacaoService = new NFEAutorizacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const autorizacao = new NFEAutorizacao_1.default(autorizacaoService);
            const response = await autorizacao.Exec(data);
            console.log('Retorno NFE_Autorizacao');
            console.table(response.xMotivo);
            console.log('===================================');
            return response.xmls;
        }
        catch (error) {
            throw new Error(`NFE_Autorizacao: ${error.message}`);
        }
    }
    async NFCE_Autorizacao(data) {
        try {
            const autorizacaoService = new NFCEAutorizacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const autorizacao = new NFCEAutorizacao_1.default(autorizacaoService);
            const response = await autorizacao.Exec(data);
            console.log('Retorno NFCE_Autorizacao');
            console.table(response.xMotivo);
            console.log('===================================');
            return response.xmls;
        }
        catch (error) {
            throw new Error(`NFCE_Autorizacao: ${error.message}`);
        }
    }
    /**
     * Inutilização
     */
    async NFE_Inutilizacao(data) {
        try {
            const inutilizacaoService = new NFEInutilizacaoService_1.default(this.environment, this.utility, this.xmlBuilder, this.axios, this.saveFiles, this.gerarConsulta);
            const inutilizacao = new NFEInutilizacao_1.default(inutilizacaoService);
            const response = await inutilizacao.Exec(data);
            console.log('Retorno NFE_Inutilizacao');
            console.log(`   ${response.xMotivo}`);
            console.log('===================================');
            return response;
        }
        catch (error) {
            throw new Error(`NFE_Inutilizacao: ${error.message}`);
        }
    }
    /**
     * DANFE
     */
    async NFE_GerarDanfe(data) {
        try {
            const { dfe: { exibirMarcaDaguaDanfe } } = this.environment.getConfig();
            const distribuicaoDFe = new NFEGerarDanfe_1.default(data);
            const response = await distribuicaoDFe.generatePDF(exibirMarcaDaguaDanfe);
            if (typeof response === 'object' && response !== null && 'message' in response) {
                console.log(response.message); // Agora o TS sabe que tem message
            }
            else if (typeof response === 'string') {
                console.log('Retorno é uma string base64');
            }
            else if (Buffer.isBuffer(response)) {
                console.log('Retorno é um Buffer');
            }
            return response;
        }
        catch (error) {
            throw new Error(`NFE_GerarDanfe: ${error.message}`);
        }
    }
    async NFCE_GerarDanfe(data) {
        try {
            const { dfe: { exibirMarcaDaguaDanfe } } = this.environment.getConfig();
            const distribuicaoDFe = new NFCEGerarDanfe_1.default(data);
            const response = await distribuicaoDFe.generatePDF(exibirMarcaDaguaDanfe);
            console.log('Retorno NFCE_GerarDanfe');
            console.log(response.message);
            console.log('===================================');
            return response;
        }
        catch (error) {
            throw new Error(`NFCE_GerarDanfe: ${error.message}`);
        }
    }
    /**
     * Método para envio de e-mail
     * @param {EmailParams} mailParams - Mensagem de texto (aceita html)
     */
    NFE_EnviaEmail(mailParams) {
        try {
            const mailController = new MailAdapter_1.default(this.environment);
            const response = mailController.sendEmail(mailParams);
            console.log('Retorno NFE_EnviaEmail');
            console.log('E-mail enviado com sucesso.');
            console.log('===================================');
            return response;
        }
        catch (error) {
            throw new Error(`NFE_EnviaEmail: ${error.message}`);
        }
    }
    /**
     * Validação de ambiente
     */
    async validateEnvironment(prop) {
        if (!this.environment.isLoaded) {
            throw new Error(`Ambiente não carregado. Por favor, carregue o ambiente utilizando o método "NFE_LoadEnvironment({ sua_configuracao })" antes de chamar o método ${prop}.`);
        }
    }
}
exports.default = NFeWizardService;
//# sourceMappingURL=NFeWizardService.js.map
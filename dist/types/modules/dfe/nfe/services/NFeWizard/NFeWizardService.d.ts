import { NFeWizardServiceImpl } from '@Interfaces';
import { Cancelamento, CartaDeCorrecao, CienciaDaOperacao, ConfirmacaoDaOperacao, ConsultaNFe, DesconhecimentoDaOperacao, DFePorChaveNFe, DFePorNSU, DFePorUltimoNSU, EmailParams, EPEC, EventoNFe, InutilizacaoData, NFe, NFEGerarDanfeProps, NFeWizardProps, OperacaoNaoRealizada } from '@Types';
declare class NFeWizardService implements NFeWizardServiceImpl {
    private config;
    private environment;
    private utility;
    private xmlBuilder;
    private axios;
    private saveFiles;
    private gerarConsulta;
    constructor();
    NFE_LoadEnvironment({ config }: {
        config: NFeWizardProps;
    }): Promise<void>;
    /**
     * Status Serviço
     */
    NFE_ConsultaStatusServico(): Promise<any>;
    /**
     * Consulta Protocolo
     */
    NFE_ConsultaProtocolo(chave: string): Promise<any>;
    /**
     * Recepção de Eventos
     */
    NFE_RecepcaoEvento(evento: EventoNFe): Promise<any>;
    NFE_EventoPrevioDeEmissaoEmContingencia(evento: EPEC): Promise<any>;
    NFE_Cancelamento(evento: Cancelamento): Promise<any>;
    NFE_CienciaDaOperacao(evento: CienciaDaOperacao): Promise<any>;
    NFE_ConfirmacaoDaOperacao(evento: ConfirmacaoDaOperacao): Promise<any>;
    NFE_OperacaoNaoRealizada(evento: OperacaoNaoRealizada): Promise<any>;
    NFE_CartaDeCorrecao(evento: CartaDeCorrecao): Promise<any>;
    NFE_DesconhecimentoDaOperacao(evento: DesconhecimentoDaOperacao): Promise<any>;
    /**
     * Distribuição DFe
     */
    NFE_DistribuicaoDFe(data: ConsultaNFe): Promise<any>;
    NFE_DistribuicaoDFePorUltNSU(data: DFePorUltimoNSU): Promise<any>;
    NFE_DistribuicaoDFePorNSU(data: DFePorNSU): Promise<any>;
    NFE_DistribuicaoDFePorChave(data: DFePorChaveNFe): Promise<any>;
    /**
     * Autorização
     */
    NFE_Autorizacao(data: NFe): Promise<any>;
    NFCE_Autorizacao(data: NFe): Promise<any>;
    /**
     * Inutilização
     */
    NFE_Inutilizacao(data: InutilizacaoData): Promise<any>;
    /**
     * DANFE
     */
    NFE_GerarDanfe(data: NFEGerarDanfeProps): Promise<string | Buffer | {
        message: string;
        success: boolean;
        outputPath?: string;
    }>;
    NFCE_GerarDanfe(data: NFEGerarDanfeProps): Promise<{
        message: string;
        success: boolean;
    }>;
    /**
     * Método para envio de e-mail
     * @param {EmailParams} mailParams - Mensagem de texto (aceita html)
     */
    NFE_EnviaEmail(mailParams: EmailParams): void;
    /**
     * Validação de ambiente
     */
    private validateEnvironment;
}
export default NFeWizardService;

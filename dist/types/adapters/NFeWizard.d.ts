import { NFeWizardProps, EventoNFe, ConsultaNFe, NFe, InutilizacaoData, NFEGerarDanfeProps, DFePorChaveNFe, DFePorUltimoNSU, DFePorNSU, Cancelamento, CienciaDaOperacao, ConfirmacaoDaOperacao, OperacaoNaoRealizada, CartaDeCorrecao, DesconhecimentoDaOperacao, EPEC, EmailParams } from 'src/core/types';
import { NFeWizardImpl } from '@Interfaces';
export default class NFeWizard implements NFeWizardImpl {
    private nfeWizardService;
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
    NFE_RecepcaoEvento(evento: EventoNFe): Promise<import("src/core/types").GenericObject[]>;
    NFE_EventoPrevioDeEmissaoEmContingencia(evento: EPEC): Promise<import("src/core/types").GenericObject[]>;
    NFE_Cancelamento(evento: Cancelamento): Promise<import("src/core/types").GenericObject[]>;
    NFE_CienciaDaOperacao(evento: CienciaDaOperacao): Promise<import("src/core/types").GenericObject[]>;
    NFE_ConfirmacaoDaOperacao(evento: ConfirmacaoDaOperacao): Promise<import("src/core/types").GenericObject[]>;
    NFE_OperacaoNaoRealizada(evento: OperacaoNaoRealizada): Promise<import("src/core/types").GenericObject[]>;
    NFE_CartaDeCorrecao(evento: CartaDeCorrecao): Promise<import("src/core/types").GenericObject[]>;
    NFE_DesconhecimentoDaOperacao(evento: DesconhecimentoDaOperacao): Promise<import("src/core/types").GenericObject[]>;
    /**
     * Distribuição DFe
     */
    NFE_DistribuicaoDFe(data: ConsultaNFe): Promise<import("src/core/types").GenericObject>;
    NFE_DistribuicaoDFePorUltNSU(data: DFePorUltimoNSU): Promise<import("src/core/types").GenericObject>;
    NFE_DistribuicaoDFePorNSU(data: DFePorNSU): Promise<import("src/core/types").GenericObject>;
    NFE_DistribuicaoDFePorChave(data: DFePorChaveNFe): Promise<import("src/core/types").GenericObject>;
    /**
     * Autorização
     */
    NFE_Autorizacao(data: NFe): Promise<{
        NFe: import("src/core/types").LayoutNFe;
        protNFe: import("src/core/types").ProtNFe;
    }[]>;
    NFCE_Autorizacao(data: NFe): Promise<{
        NFe: import("src/core/types").LayoutNFe;
        protNFe: import("src/core/types").ProtNFe;
    }[]>;
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
}
//# sourceMappingURL=NFeWizard.d.ts.map
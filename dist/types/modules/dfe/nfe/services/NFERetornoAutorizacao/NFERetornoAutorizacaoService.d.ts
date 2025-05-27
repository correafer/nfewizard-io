import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { ProtNFe } from '@Types';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, NFERetornoAutorizacaoServiceImpl, SaveFilesImpl } from '@Interfaces';
declare class NFERetornoAutorizacaoService extends BaseNFE implements NFERetornoAutorizacaoServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(data: string): string;
    /**
     * Busca o retorno da Autorização pelo número do recibo (nRec)
     *
     * @param {string} nRec - Número do recibo retornado pela SEFAZ ao emitir uma NFe em modo assíncrono.
     * @param {any} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {Promise<string>} XML completo da NFe (já com protocolo de autorização).
     */
    getRetornoRecibo(nRec: string, xmlNFe: string[]): Promise<{
        success: boolean;
        message: any;
        data: string[];
    }>;
    /**
     * Agrega o protNFe ao restante da NFe gerada na emissão.
     *
     * @param {string} protNFe - Tag protNFe do XML em formato JSON.
     * @param {any} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {} XML completo da NFe (já com protocolo de autorização).
     */
    private getXmlRetornoAutorizacao;
    /**
     * Retorna o XML completo da Autorização (já com o protocolo de autorização)
     *
     * @param {number} tipoEmissao - Informa se o tipo emissão foi síncrona ou assíncrona (0- Não / 1 - Sim).
     * @param {string | undefined} nRec - Número do recibo retornado pela SEFAZ ao emitir uma NFe em modo assíncrono.
     * @param {ProtNFe | undefined} protNFe - Tag protNFe do XML em formato JSON.
     * @param {string[]} xmlNFe - Array contendo as NFe do lote enviado à SEFAZ.
     * @returns {Promise<string>} XML completo da NFe (já com protocolo de autorização).
     */
    getXmlRetorno({ tipoEmissao, nRec, protNFe, xmlNFe }: {
        tipoEmissao: number;
        nRec?: string;
        protNFe?: ProtNFe[];
        xmlNFe: string[];
    }): Promise<{
        success: boolean;
        message: any;
        data: string[];
    }>;
}
export default NFERetornoAutorizacaoService;
//# sourceMappingURL=NFERetornoAutorizacaoService.d.ts.map
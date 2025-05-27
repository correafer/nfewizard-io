import { AxiosInstance, AxiosResponse } from 'axios';
import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import { GenericObject, LayoutNFe, NFe, ProtNFe } from '@Types';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { GerarConsultaImpl, NFCEAutorizacaoServiceImpl, SaveFilesImpl } from '@Interfaces';
declare class NFCEAutorizacaoService extends BaseNFE implements NFCEAutorizacaoServiceImpl {
    xmlNFe: string[];
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(data: NFe): string;
    protected salvaArquivos(xmlConsulta: string, responseInJson: GenericObject, xmlRetorno: AxiosResponse<any, any>, options?: Record<string, any>): GenericObject;
    private trataRetorno;
    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    private anoMesEmissao;
    private diaEmissao;
    private calcularModulo11;
    private calcularDigitoVerificador;
    private validaDocumento;
    private extrairDigestValue;
    private gerarXmlNFCEAutorizacao;
    Exec(data: NFe): Promise<{
        success: boolean;
        xMotivo: GenericObject;
        xmls: {
            NFe: LayoutNFe;
            protNFe: ProtNFe;
        }[];
    }>;
}
export default NFCEAutorizacaoService;

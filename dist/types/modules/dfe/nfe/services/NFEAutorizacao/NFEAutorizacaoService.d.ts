import { AxiosInstance, AxiosResponse } from 'axios';
import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { GenericObject, LayoutNFe, NFe, ProtNFe } from '../../../../../../core/types/index';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { GerarConsultaImpl, NFEAutorizacaoServiceImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
declare class NFEAutorizacaoService extends BaseNFE implements NFEAutorizacaoServiceImpl {
    xmlNFe: string[];
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(data: NFe): string;
    protected salvaArquivos(xmlConsulta: string, responseInJson: GenericObject, xmlRetorno: AxiosResponse<any, any>, options?: Record<string, any>): GenericObject;
    private trataRetorno;
    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    private anoMesEmissao;
    private gerarCodigoNumerico;
    private calcularModulo11;
    private calcularDigitoVerificador;
    private validaDocumento;
    private gerarXmlNFeAutorizacao;
    Exec(data: NFe): Promise<{
        success: boolean;
        xMotivo: GenericObject;
        xmls: {
            NFe: LayoutNFe;
            protNFe: ProtNFe;
        }[];
    }>;
}
export default NFEAutorizacaoService;

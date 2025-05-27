import Environment from '../../../../modules/environment/Environment.js';
import XmlBuilder from '../../../../adapters/XmlBuilder.js';
import Utility from '../../../core/utils/Utility.js';
import { AxiosInstance } from 'axios';
import { SaveFilesImpl, GerarConsultaImpl } from '../../../../core/interfaces/index';
declare abstract class BaseNFE {
    environment: Environment;
    utility: Utility;
    metodo: string;
    xmlBuilder: XmlBuilder;
    chaveNfe: string;
    axios: AxiosInstance;
    saveFiles: SaveFilesImpl;
    gerarConsulta: GerarConsultaImpl;
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, metodo: string, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    /**
     * Método de geração do XML - Deve ser implementado pelas subclasses
     */
    protected gerarXml(data?: any): string;
    protected setContentType(): "text/xml; charset=utf-8" | "application/soap+xml";
    /**
     * Executa a requisição ao webservice SEFAZ
     * @param {any} [data] - Dados opcionais usados para gerar o XML em algumas subclasses.
     * @returns {Promise<any>} A resposta do webservice em JSON.
     */
    Exec(data?: any): Promise<any>;
}
export default BaseNFE;

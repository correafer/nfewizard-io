import Utility from '../../../../../../../core/utils/Utility.js';
import { GenericObject } from '../../../../../../../core/types/index';
import Environment from '../../../../../../../modules/environment/Environment.js';
import { AxiosResponse } from 'axios';
declare class DistribuicaoHandler {
    environment: Environment;
    utility: Utility;
    metodo: string;
    constructor(environment: Environment, utility: Utility, metodo: string);
    /**
     * Métodos para tratativas do DistribuicaoDFe
     */
    protected salvaArquivos(XMLDistribuicaoInJson: GenericObject, XMLDistribuicao: string, chNFe: string): void;
    deCompressDFeXML(loteDistDFeInt: AxiosResponse<any, any>, metodo: string, xmlConsulta: string): string[];
    decodeDocZip(docZip: any): string;
    removeSignatureTag(xmlString: string): string;
    parseXml(xmlString: string): undefined;
    getChNFe(parsedResult: GenericObject): any;
    getTipo(parsedResult: GenericObject): "res" | "event" | "proc";
    handleResponse(XMLDistribuicaoInJson: GenericObject, XMLDistribuicao: string, chNFe: string): void;
}
export default DistribuicaoHandler;

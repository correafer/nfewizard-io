import XmlBuilder from '../../../../adapters/XmlBuilder';
import Utility from '../../../../core/utils/Utility';
import { GerarConsultaImpl } from '../../../../core/interfaces/index';
import Environment from '../../../../modules/environment/Environment.js';
declare class GerarConsulta implements GerarConsultaImpl {
    utility: Utility;
    environment: Environment;
    xmlBuilder: XmlBuilder;
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder);
    gerarConsulta(xmlConsulta: string, metodo: string, ambienteNacional?: boolean, versao?: string, mod?: string, rootTag?: boolean, tag?: string): Promise<{
        xmlFormated: string;
        agent: import("https").Agent;
        webServiceUrl: string;
        action: string;
    }>;
}
export default GerarConsulta;

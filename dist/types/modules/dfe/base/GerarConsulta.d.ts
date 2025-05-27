import XmlBuilder from '@Adapters/XmlBuilder';
import Utility from '@Core/utils/Utility';
import { GerarConsultaImpl } from '@Interfaces';
import Environment from '@Modules/environment/Environment.js';
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

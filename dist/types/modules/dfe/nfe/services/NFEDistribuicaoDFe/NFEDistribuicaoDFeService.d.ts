import { AxiosInstance } from 'axios';
import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import { ConsultaNFe, GenericObject } from '@Types';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { GerarConsultaImpl, SaveFilesImpl } from '@Interfaces';
declare class NFEDistribuicaoDFeService extends BaseNFE {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(data: ConsultaNFe): string;
    gerarXmlNFeDistribuicaoDFe(data: ConsultaNFe): string;
    Exec(data: ConsultaNFe): Promise<{
        data: GenericObject;
        xMotivo: any;
        filesList: string[];
    }>;
}
export default NFEDistribuicaoDFeService;

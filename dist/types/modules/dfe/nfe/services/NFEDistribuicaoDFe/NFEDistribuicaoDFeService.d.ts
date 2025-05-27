import { AxiosInstance } from 'axios';
import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { ConsultaNFe, GenericObject } from '../../../../../../core/types/index';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { GerarConsultaImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
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

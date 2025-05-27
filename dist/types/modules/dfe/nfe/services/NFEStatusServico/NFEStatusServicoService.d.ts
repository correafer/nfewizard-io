import Environment from '../../../../../../modules/environment/Environment.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import Utility from '../../../../../../core/utils/Utility.js';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { AxiosInstance } from 'axios';
import { SaveFilesImpl, GerarConsultaImpl, NFEStatusServicoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEStatusServicoService extends BaseNFE implements NFEStatusServicoServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(): string;
}
export default NFEStatusServicoService;

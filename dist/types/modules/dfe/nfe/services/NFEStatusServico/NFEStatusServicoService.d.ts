import Environment from '@Modules/environment/Environment.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import Utility from '@Utils/Utility.js';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { AxiosInstance } from 'axios';
import { SaveFilesImpl, GerarConsultaImpl, NFEStatusServicoServiceImpl } from '@Interfaces';
declare class NFEStatusServicoService extends BaseNFE implements NFEStatusServicoServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(): string;
}
export default NFEStatusServicoService;

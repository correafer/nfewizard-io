import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder';
import BaseNFE from '../../../../../../modules/dfe/base/BaseNFe.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, SaveFilesImpl, NFEconsultaProtocoloServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEconsultaProtocoloService extends BaseNFE implements NFEconsultaProtocoloServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(chave: string): string;
}
export default NFEconsultaProtocoloService;

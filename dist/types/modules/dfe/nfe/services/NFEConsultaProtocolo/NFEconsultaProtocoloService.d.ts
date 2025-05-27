import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder';
import BaseNFE from '@Modules/dfe/base/BaseNFe.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, SaveFilesImpl, NFEconsultaProtocoloServiceImpl } from '@Interfaces';
declare class NFEconsultaProtocoloService extends BaseNFE implements NFEconsultaProtocoloServiceImpl {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
    protected gerarXml(chave: string): string;
}
export default NFEconsultaProtocoloService;
//# sourceMappingURL=NFEconsultaProtocoloService.d.ts.map
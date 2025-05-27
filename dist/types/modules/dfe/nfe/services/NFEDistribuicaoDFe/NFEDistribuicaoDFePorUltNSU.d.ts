import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, SaveFilesImpl } from '@Interfaces';
import NFEDistribuicaoDFeService from './NFEDistribuicaoDFeService.js';
declare class NFEDistribuicaoDFePorUltNSUService extends NFEDistribuicaoDFeService {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
}
export default NFEDistribuicaoDFePorUltNSUService;
//# sourceMappingURL=NFEDistribuicaoDFePorUltNSU.d.ts.map
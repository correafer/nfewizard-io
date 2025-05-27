import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
import NFEDistribuicaoDFeService from './NFEDistribuicaoDFeService.js';
declare class NFEDistribuicaoDFePorNSUService extends NFEDistribuicaoDFeService {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
}
export default NFEDistribuicaoDFePorNSUService;

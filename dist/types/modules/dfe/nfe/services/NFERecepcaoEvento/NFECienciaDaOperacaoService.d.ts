import Environment from '../../../../../../modules/environment/Environment.js';
import Utility from '../../../../../../core/utils/Utility.js';
import XmlBuilder from '../../../../../../adapters/XmlBuilder.js';
import { AxiosInstance } from 'axios';
import NFERecepcaoEventoService from './NFERecepcaoEventoService';
import { GerarConsultaImpl, SaveFilesImpl } from '../../../../../../core/interfaces/index';
declare class NFECienciaDaOperacaoService extends NFERecepcaoEventoService {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
}
export default NFECienciaDaOperacaoService;

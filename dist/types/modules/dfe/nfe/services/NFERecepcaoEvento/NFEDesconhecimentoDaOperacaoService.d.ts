import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import { AxiosInstance } from 'axios';
import NFERecepcaoEventoService from './NFERecepcaoEventoService';
import { SaveFilesImpl, GerarConsultaImpl } from '@Interfaces';
declare class NFEDesconhecimentoDaOperacaoService extends NFERecepcaoEventoService {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
}
export default NFEDesconhecimentoDaOperacaoService;

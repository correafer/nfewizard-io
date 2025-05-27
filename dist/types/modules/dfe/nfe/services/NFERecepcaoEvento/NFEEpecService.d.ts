import Environment from '@Modules/environment/Environment.js';
import Utility from '@Utils/Utility.js';
import XmlBuilder from '@Adapters/XmlBuilder.js';
import { AxiosInstance } from 'axios';
import { GerarConsultaImpl, SaveFilesImpl } from '@Interfaces';
import NFERecepcaoEventoService from './NFERecepcaoEventoService';
declare class NFEEpecService extends NFERecepcaoEventoService {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance, saveFiles: SaveFilesImpl, gerarConsulta: GerarConsultaImpl);
}
export default NFEEpecService;
//# sourceMappingURL=NFEEpecService.d.ts.map
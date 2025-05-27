import Utility from '../../../../core/utils/Utility';
import { SaveFilesImpl } from '../../../../core/interfaces/index';
import Environment from '../../../../modules/environment/Environment.js';
import { GenericObject } from '../../../../core/types/index';
import { AxiosResponse } from 'axios';
declare class SaveFiles implements SaveFilesImpl {
    utility: Utility;
    environment: Environment;
    constructor(environment: Environment, utility: Utility);
    salvaArquivos(xmlConsulta: string, responseInJson: GenericObject | undefined, xmlRetorno: AxiosResponse<any, any>, metodo: string, xmlFormated?: string, options?: Record<string, any>): void;
}
export default SaveFiles;

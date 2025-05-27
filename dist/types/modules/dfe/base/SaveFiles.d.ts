import Utility from '@Core/utils/Utility';
import { SaveFilesImpl } from '@Interfaces';
import Environment from '@Modules/environment/Environment.js';
import { GenericObject } from '@Types';
import { AxiosResponse } from 'axios';
declare class SaveFiles implements SaveFilesImpl {
    utility: Utility;
    environment: Environment;
    constructor(environment: Environment, utility: Utility);
    salvaArquivos(xmlConsulta: string, responseInJson: GenericObject | undefined, xmlRetorno: AxiosResponse<any, any>, metodo: string, xmlFormated?: string, options?: Record<string, any>): void;
}
export default SaveFiles;
//# sourceMappingURL=SaveFiles.d.ts.map
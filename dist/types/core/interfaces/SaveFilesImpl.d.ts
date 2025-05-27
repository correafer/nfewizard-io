import { GenericObject } from '../../../core/types/Utils';
import { AxiosResponse } from 'axios';
export interface SaveFilesImpl {
    salvaArquivos(xmlConsulta: string, responseInJson: GenericObject | undefined, xmlRetorno: AxiosResponse<any, any>, metodo: string, xmlFormated?: string, options?: Record<string, any>): void;
}

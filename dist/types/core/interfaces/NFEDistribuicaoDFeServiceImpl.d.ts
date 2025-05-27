import { ConsultaNFe } from '../../../core/types/NFEDistribuicaoDFe';
import { GenericObject } from '../../../core/types/Utils';
export interface NFEDistribuicaoDFeServiceImpl {
    Exec(data: ConsultaNFe): Promise<{
        data: GenericObject;
        xMotivo: any;
        filesList: string[];
    }>;
}

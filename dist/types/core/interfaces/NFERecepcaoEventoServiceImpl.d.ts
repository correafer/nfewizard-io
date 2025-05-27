import { EventoNFe } from '../../../core/types/NFERecepcaoEvento';
import { GenericObject } from '../../../core/types/Utils';
export interface NFERecepcaoEventoServiceImpl {
    Exec(data: EventoNFe): Promise<{
        success: boolean;
        xMotivos: any[];
        response: GenericObject[];
    }>;
}

import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFERecepcaoEvento implements NFERecepcaoEventoServiceImpl {
    nfeRecepcaoEventoService: NFERecepcaoEventoServiceImpl;
    constructor(nfeRecepcaoEventoService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFERecepcaoEvento;

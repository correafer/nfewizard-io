import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEEpec implements NFERecepcaoEventoServiceImpl {
    nfeEpecServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeEpecServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEEpec;

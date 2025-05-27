import { NFERecepcaoEventoServiceImpl } from '@Interfaces';
declare class NFEEpec implements NFERecepcaoEventoServiceImpl {
    nfeEpecServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeEpecServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEEpec;
//# sourceMappingURL=NFEEpec.d.ts.map
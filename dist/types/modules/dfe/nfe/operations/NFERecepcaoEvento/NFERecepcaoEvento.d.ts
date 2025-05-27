import { NFERecepcaoEventoServiceImpl } from '@Interfaces';
declare class NFERecepcaoEvento implements NFERecepcaoEventoServiceImpl {
    nfeRecepcaoEventoService: NFERecepcaoEventoServiceImpl;
    constructor(nfeRecepcaoEventoService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFERecepcaoEvento;
//# sourceMappingURL=NFERecepcaoEvento.d.ts.map
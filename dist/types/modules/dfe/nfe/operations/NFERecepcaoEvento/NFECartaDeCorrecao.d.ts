import { NFERecepcaoEventoServiceImpl } from '@Interfaces/NFERecepcaoEventoServiceImpl.js';
declare class NFECartaDeCorrecao implements NFERecepcaoEventoServiceImpl {
    nfeCartaDeCorrecaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeCartaDeCorrecaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFECartaDeCorrecao;
//# sourceMappingURL=NFECartaDeCorrecao.d.ts.map
import { NFERecepcaoEventoServiceImpl } from '@Interfaces';
declare class NFEOperacaoNaoRealizada implements NFERecepcaoEventoServiceImpl {
    nfeOperacaoNaoRealizadaServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeOperacaoNaoRealizadaServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEOperacaoNaoRealizada;
//# sourceMappingURL=NFEOperacaoNaoRealizada.d.ts.map
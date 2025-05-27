import { NFERecepcaoEventoServiceImpl } from '@Interfaces';
declare class NFECancelamento implements NFERecepcaoEventoServiceImpl {
    nfeCancelamentoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeCancelamentoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFECancelamento;
//# sourceMappingURL=NFECancelamento.d.ts.map
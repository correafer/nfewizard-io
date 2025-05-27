import { NFEStatusServicoServiceImpl } from '@Interfaces';
declare class NFEStatusServico implements NFEStatusServicoServiceImpl {
    nfeStatusServicoService: NFEStatusServicoServiceImpl;
    constructor(nfeStatusServicoService: NFEStatusServicoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEStatusServico;
//# sourceMappingURL=NFEStatusServico.d.ts.map
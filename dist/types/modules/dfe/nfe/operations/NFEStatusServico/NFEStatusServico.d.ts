import { NFEStatusServicoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEStatusServico implements NFEStatusServicoServiceImpl {
    nfeStatusServicoService: NFEStatusServicoServiceImpl;
    constructor(nfeStatusServicoService: NFEStatusServicoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEStatusServico;

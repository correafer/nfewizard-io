import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFECancelamento implements NFERecepcaoEventoServiceImpl {
    nfeCancelamentoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeCancelamentoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFECancelamento;

import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEOperacaoNaoRealizada implements NFERecepcaoEventoServiceImpl {
    nfeOperacaoNaoRealizadaServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeOperacaoNaoRealizadaServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEOperacaoNaoRealizada;

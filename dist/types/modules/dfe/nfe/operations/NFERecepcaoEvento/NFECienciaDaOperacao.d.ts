import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFECienciaDaOperacao implements NFERecepcaoEventoServiceImpl {
    nfeCienciaDaOperacaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeCienciaDaOperacaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFECienciaDaOperacao;

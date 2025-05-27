import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFEDesconhecimentoDaOperacao implements NFERecepcaoEventoServiceImpl {
    nfeDesconhecimentoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeDesconhecimentoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEDesconhecimentoDaOperacao;

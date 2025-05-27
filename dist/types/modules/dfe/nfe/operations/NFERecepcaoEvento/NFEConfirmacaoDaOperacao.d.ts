import { NFERecepcaoEventoServiceImpl } from '../../../../../../core/interfaces/NFERecepcaoEventoServiceImpl.js';
declare class NFEConfirmacaoDaOperacao implements NFERecepcaoEventoServiceImpl {
    nfeConfirmacaoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeConfirmacaoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEConfirmacaoDaOperacao;

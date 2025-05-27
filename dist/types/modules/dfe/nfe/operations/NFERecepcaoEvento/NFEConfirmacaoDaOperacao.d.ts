import { NFERecepcaoEventoServiceImpl } from '@Interfaces/NFERecepcaoEventoServiceImpl.js';
declare class NFEConfirmacaoDaOperacao implements NFERecepcaoEventoServiceImpl {
    nfeConfirmacaoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeConfirmacaoDaOperacaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEConfirmacaoDaOperacao;

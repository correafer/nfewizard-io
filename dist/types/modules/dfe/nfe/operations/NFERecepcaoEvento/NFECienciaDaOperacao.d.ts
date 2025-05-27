import { NFERecepcaoEventoServiceImpl } from '@Interfaces';
declare class NFECienciaDaOperacao implements NFERecepcaoEventoServiceImpl {
    nfeCienciaDaOperacaoServiceService: NFERecepcaoEventoServiceImpl;
    constructor(nfeCienciaDaOperacaoServiceService: NFERecepcaoEventoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFECienciaDaOperacao;
//# sourceMappingURL=NFECienciaDaOperacao.d.ts.map
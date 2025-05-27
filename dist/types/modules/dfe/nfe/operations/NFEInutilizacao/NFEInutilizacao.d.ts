import { NFEInutilizacaoServiceImpl } from '@Interfaces';
declare class NFEInutilizacao implements NFEInutilizacaoServiceImpl {
    nfeInutilizacaoService: NFEInutilizacaoServiceImpl;
    constructor(nfeInutilizacaoService: NFEInutilizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEInutilizacao;
//# sourceMappingURL=NFEInutilizacao.d.ts.map
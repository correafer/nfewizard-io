import { NFEAutorizacaoServiceImpl } from '@Interfaces/NFEAutorizacaoServiceImpl.js';
declare class NFEAutorizacao {
    nfeAutorizacaoService: NFEAutorizacaoServiceImpl;
    constructor(nfeAutorizacaoService: NFEAutorizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEAutorizacao;
//# sourceMappingURL=NFEAutorizacao.d.ts.map
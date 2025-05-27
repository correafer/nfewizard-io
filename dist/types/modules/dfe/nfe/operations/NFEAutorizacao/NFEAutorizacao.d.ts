import { NFEAutorizacaoServiceImpl } from '../../../../../../core/interfaces/NFEAutorizacaoServiceImpl.js';
declare class NFEAutorizacao {
    nfeAutorizacaoService: NFEAutorizacaoServiceImpl;
    constructor(nfeAutorizacaoService: NFEAutorizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFEAutorizacao;

import { NFCEAutorizacaoServiceImpl } from '../../../../../../core/interfaces/index';
declare class NFCEAutorizacao {
    nfceAutorizacaoService: NFCEAutorizacaoServiceImpl;
    constructor(nfceAutorizacaoService: NFCEAutorizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFCEAutorizacao;

import { NFCEAutorizacaoServiceImpl } from '@Interfaces';
declare class NFCEAutorizacao {
    nfceAutorizacaoService: NFCEAutorizacaoServiceImpl;
    constructor(nfceAutorizacaoService: NFCEAutorizacaoServiceImpl);
    Exec(data?: any): Promise<any>;
}
export default NFCEAutorizacao;

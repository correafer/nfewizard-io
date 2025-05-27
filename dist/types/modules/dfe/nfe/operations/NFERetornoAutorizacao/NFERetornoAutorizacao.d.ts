import { NFERetornoAutorizacaoServiceImpl } from '@Interfaces';
import { ProtNFe } from '@Types/NFEAutorizacao';
declare class NFERetornoAutorizacao implements NFERetornoAutorizacaoServiceImpl {
    nfeRetornoAutorizacaoService: NFERetornoAutorizacaoServiceImpl;
    constructor(nfeRetornoAutorizacaoService: NFERetornoAutorizacaoServiceImpl);
    getXmlRetorno(data: {
        tipoEmissao: number;
        nRec?: string;
        protNFe?: ProtNFe[];
        xmlNFe: string[];
    }): Promise<{
        success: boolean;
        message: any;
        data: string[];
    }>;
}
export default NFERetornoAutorizacao;
//# sourceMappingURL=NFERetornoAutorizacao.d.ts.map
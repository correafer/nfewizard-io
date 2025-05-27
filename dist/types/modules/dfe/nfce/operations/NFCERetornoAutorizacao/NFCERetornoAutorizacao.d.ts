import { NFCERetornoAutorizacaoServiceImpl } from '@Interfaces';
import { ProtNFe } from '@Types/NFEAutorizacao';
declare class NFCERetornoAutorizacao implements NFCERetornoAutorizacaoServiceImpl {
    nfceAutorizacaoRetornoService: NFCERetornoAutorizacaoServiceImpl;
    constructor(nfceAutorizacaoRetornoService: NFCERetornoAutorizacaoServiceImpl);
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
export default NFCERetornoAutorizacao;

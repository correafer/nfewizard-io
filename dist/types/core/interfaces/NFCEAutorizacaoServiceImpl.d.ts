import { LayoutNFe, NFe, ProtNFe, GenericObject } from '../../../core/types/index';
export interface NFCEAutorizacaoServiceImpl {
    Exec(data: NFe): Promise<{
        success: boolean;
        xMotivo: GenericObject;
        xmls: {
            NFe: LayoutNFe;
            protNFe: ProtNFe;
        }[];
    }>;
}

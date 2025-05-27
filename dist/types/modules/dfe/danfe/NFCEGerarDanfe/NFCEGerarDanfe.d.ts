import { DetProd, NFEGerarDanfeProps, Ide, Dest, Emit, Total, Transp, InfAdic, ProtNFe, Pag, InfNFeSupl } from 'src/core/types';
import PDFDocument from 'pdfkit';
import ValidaCPFCNPJ from '@Core/utils/ValidaCPFCNPJ';
declare class NFCEGerarDanfe {
    data: NFEGerarDanfeProps['data'];
    chave: string;
    enviada: boolean;
    outputPath: string;
    qrcodePath: string;
    documento: ValidaCPFCNPJ;
    protNFe: ProtNFe | undefined;
    det: DetProd | DetProd[];
    ide: Ide;
    dest: Dest | undefined;
    emit: Emit;
    total: Total;
    transp: Transp;
    pag: Pag;
    infAdic: InfAdic | undefined;
    infNFeSupl: InfNFeSupl | undefined;
    exibirMarcaDaguaDanfe?: boolean;
    fontSize: number;
    larguraPadrao: number;
    documentWidth: number;
    itemHeight: number;
    doc: InstanceType<typeof PDFDocument>;
    constructor(props: NFEGerarDanfeProps);
    saveQRCode: (text: string) => Promise<void>;
    getQRCodeBuffer: (text: string) => Promise<Buffer>;
    createDir(path: string): void;
    generateBarcode(data: string): Promise<null | undefined>;
    centeredPos(texto: string): number;
    ajustarPosicao(posicaoOriginal: number, novaLargura: number): number;
    calculaPosicao(text: string): number;
    drawHeader(isFirstPage: boolean): void;
    drawFooter(qrCodeBuffer: Buffer): void;
    _buildHeader(): void;
    _buildProdutos(): void;
    _buildTotais(): void;
    _buildFooter(qrCodeBuffer: Buffer): void;
    generatePDF(exibirMarcaDaguaDanfe?: boolean): Promise<{
        message: string;
        success: boolean;
    }>;
}
export default NFCEGerarDanfe;
//# sourceMappingURL=NFCEGerarDanfe.d.ts.map
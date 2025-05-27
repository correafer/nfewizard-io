import { DetProd, NFEGerarDanfeProps, Ide, Dest, Emit, Total, Transp, InfAdic, ProtNFe } from 'src/core/types';
import PDFDocument from 'pdfkit';
import ValidaCPFCNPJ from '@Core/utils/ValidaCPFCNPJ';
declare class NFEGerarDanfe {
    data: NFEGerarDanfeProps['data'];
    chave: string;
    enviada: boolean;
    outputPath: string;
    documento: ValidaCPFCNPJ;
    protNFe: ProtNFe | undefined;
    det: DetProd | DetProd[];
    ide: Ide;
    dest: Dest | undefined;
    emit: Emit;
    total: Total;
    transp: Transp;
    infAdic: InfAdic | undefined;
    exibirMarcaDaguaDanfe?: boolean;
    doc: InstanceType<typeof PDFDocument>;
    barcodeBuffer: Buffer | null;
    logoUrl?: string;
    logoBuffer: Buffer | null;
    private productTableCurrentY;
    private productTableHeaderHeight;
    private productTablePageNumber;
    returnType?: string | undefined;
    constructor(props: NFEGerarDanfeProps);
    generateBarcode(data: string): Promise<Buffer | null>;
    setLineStyle(lineWidth: number, strokeColor: string): void;
    drawHeader(isFirstPage: boolean): void;
    drawFooter(): void;
    _buildGuia(): void;
    _buildSeparator(): void;
    _buildHeader(pos: number): void;
    _buildDestinatario(): void;
    _builCalculoImposto(): void;
    _builTransporte(): void;
    _buildProdutos(): void;
    private _isFirstPage;
    _buildFooter(): void;
    generatePDF(exibirMarcaDaguaDanfe?: boolean): Promise<{
        message: string;
        success: boolean;
        outputPath?: string;
    } | Buffer | string>;
}
export default NFEGerarDanfe;
//# sourceMappingURL=NFEGerarDanfe.d.ts.map
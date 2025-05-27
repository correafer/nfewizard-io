"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
    * @description      :
    * @author           : Marco Aurélio Silva Lima
    * @group            :
    * @created          :
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/11/2024
    * - Author          : Cassio Seffrin
    * - Modification    :
**/
/*
 * This file is part of NFeWizard-io.
 *
 * NFeWizard-io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NFeWizard-io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NFeWizard-io. If not, see <https://www.gnu.org/licenses/>.
 */
const bwip_js_1 = __importDefault(require("bwip-js"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const date_fns_1 = require("date-fns");
const pdfkit_1 = __importDefault(require("pdfkit"));
const qrcode_1 = __importDefault(require("qrcode"));
const ValidaCPFCNPJ_1 = __importDefault(require("../../../../core/utils/ValidaCPFCNPJ.cjs"));
const getDesTipoPag_1 = require("../../../../core/utils/getDesTipoPag.cjs");
const baseDir = __dirname;
const fontDir = process.env.NODE_ENV === 'production' ? '../resources/fonts/ARIAL.TTF' : '../../../../resources/fonts/ARIAL.TTF';
const fontDirBold = process.env.NODE_ENV === 'production' ? '../resources/fonts/ARIALBD.TTF' : '../../../../resources/fonts/ARIALBD.TTF';
class NFCEGerarDanfe {
    constructor(props) {
        this.saveQRCode = async (text) => {
            const filePath = path_1.default.resolve(baseDir, this.qrcodePath);
            try {
                await qrcode_1.default.toFile(`${filePath}/qrcode.png`, text, {
                    color: {
                        dark: '#000000', // Cor do código
                        light: '#FFFFFF', // Cor de fundo
                    },
                    width: 300, // Largura da imagem
                });
            }
            catch (error) {
                console.error('Erro ao gerar o QR code:', error);
                console.error(error.stack);
            }
        };
        this.getQRCodeBuffer = async (text) => {
            try {
                const buffer = await qrcode_1.default.toBuffer(text, {
                    color: {
                        dark: '#000000', // Cor do código
                        light: '#FFFFFF', // Cor de fundo
                    },
                    width: 300, // Largura da imagem
                });
                return buffer;
            }
            catch (error) {
                console.error('Erro ao gerar o QR code:', error);
                console.error(error.stack);
                throw new Error(`Erro ao gerar o QR code: ${error.message}`);
            }
        };
        const { data, chave, outputPath, pageWidth } = props;
        this.data = data;
        this.chave = chave.trim();
        this.outputPath = outputPath;
        this.enviada = false; // Valor padrão
        this.qrcodePath = outputPath; // Caminho padrão
        this.documento = new ValidaCPFCNPJ_1.default(); // Inicialização correta
        this.protNFe = data.protNFe;
        const nfeData = Array.isArray(data.NFe) ? data.NFe[0] : data.NFe;
        const { det, ide, emit, dest, total, transp, pag, infAdic } = nfeData.infNFe;
        const infNFeSupl = nfeData.infNFeSupl;
        this.det = det;
        this.ide = ide;
        this.emit = emit;
        this.total = total;
        this.transp = transp;
        this.pag = pag;
        this.infAdic = infAdic;
        this.infNFeSupl = infNFeSupl;
        if (dest)
            this.dest = dest;
        if (this.protNFe?.infProt.nProt) {
            this.enviada = true;
        }
        function calculateHeight(itemsLength, itemHeight) {
            const headerHeight = 34.22975675056; // Altura do cabeçalho
            const footerHeight = 170; // Altura do rodapé -> 34.22975675056
            // Altura total é a soma das alturas dos itens + cabeçalho + rodapé
            return headerHeight + footerHeight + (itemsLength * itemHeight) + 5;
        }
        function calculateFontSize(width) {
            // Aqui você pode ajustar a fórmula para atender às suas necessidades
            return Math.min(width) * 0.02646;
        }
        this.larguraPadrao = 226.772;
        this.documentWidth = pageWidth || 226.772; // 158.74
        // const pageHeight = 300;
        let itensLength = 1;
        if (this.det instanceof Array) {
            itensLength = this.det.length;
        }
        const fontSize = calculateFontSize(this.documentWidth);
        this.fontSize = fontSize;
        this.itemHeight = fontSize * 1.116;
        const pageHeight = calculateHeight(itensLength, this.itemHeight);
        const fontPath = path_1.default.resolve(baseDir, fontDir);
        const fontPathBold = path_1.default.resolve(baseDir, fontDirBold);
        this.doc = new pdfkit_1.default({
            margins: { top: 5.67, right: 5.67, bottom: 5.67, left: 5.67 },
            size: [this.documentWidth, pageHeight],
            bufferPages: true,
            layout: 'portrait',
        });
        this.doc.registerFont('Arial', fontPath);
        this.doc.registerFont('Arial-bold', fontPathBold);
    }
    createDir(path) {
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path, { recursive: true });
        }
    }
    async generateBarcode(data) {
        try {
            const png = await bwip_js_1.default.toBuffer({
                bcid: 'code128', // Tipo de código de barras
                text: data, // Dado a ser codificado
                scaleX: 4, // Fator de escala
                height: 14, // Altura da barra
                includetext: false, // Incluir texto
            });
            const barcode = png.toString('base64');
            const buffer = Buffer.from(barcode, 'base64');
            const barcodeDir = this.qrcodePath;
            const barcodeFilePath = path_1.default.join(barcodeDir, 'barcode.png');
            // this.createDir(barcodeDir);
            fs_1.default.writeFileSync(barcodeFilePath, buffer);
        }
        catch (err) {
            console.error('Erro ao gerar código de barras:', err);
            return null;
        }
    }
    centeredPos(texto) {
        const larguraPagina = this.doc.page.width;
        const larguraTexto = this.doc.fontSize(this.fontSize).widthOfString(texto);
        const posicaoX = (larguraPagina - larguraTexto) / 2;
        return posicaoX;
    }
    ajustarPosicao(posicaoOriginal, novaLargura) {
        return posicaoOriginal * (novaLargura / this.larguraPadrao);
    }
    calculaPosicao(text) {
        const { right, left } = this.doc.page.margins;
        const [pageWidth] = this.doc.page.size;
        const textWidth = this.doc.widthOfString(text);
        return Number(pageWidth) - textWidth - right - left;
    }
    drawHeader(isFirstPage) {
        this._buildHeader();
    }
    drawFooter(qrCodeBuffer) {
        this._buildFooter(qrCodeBuffer);
    }
    _buildHeader() {
        const CNPJCPF = this.emit.CNPJCPF?.toString();
        const CNPJ = this.emit.CNPJ?.toString();
        const CPF = this.emit.CPF?.toString();
        const documento = this.documento.mascaraCnpjCpf(CNPJCPF || CNPJ || CPF || '');
        const identificationJoined = `${this.emit.enderEmit.xLgr}, ${this.emit.enderEmit.nro}, ${this.emit.enderEmit.xBairro}, ${this.emit.enderEmit.UF}`;
        /** IDENTIFICACAO EMITENTE */
        const _buildIdentificacaoEmit = () => {
            const centeredPosEmit = this.centeredPos(`CNPJ: ${documento} ${this.emit.xNome}`);
            const centeredPosEnd = this.centeredPos(identificationJoined);
            const centeredPosText = this.centeredPos('Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica');
            this.doc.font('Arial').fontSize(this.fontSize).text(`CNPJ: ${documento} `, centeredPosEmit, 2, {
                lineBreak: false,
            })
                .font('Arial-bold').text(this.emit.xNome)
                .fontSize(this.fontSize)
                .font('Arial')
                .text(identificationJoined, centeredPosEnd)
                .text('Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica', centeredPosText);
        };
        _buildIdentificacaoEmit();
    }
    _buildProdutos() {
        const { right, left, top } = this.doc.page.margins;
        const tableWidth = this.documentWidth - left - right;
        const startX = left;
        const tableTop = this.doc.y + top;
        const columnRatios = {
            codigo: 0.15,
            descricao: 0.40,
            qtdeUn: 0.15,
            unit: 0.15,
            total: 0.15
        };
        const columnSpacing = 0;
        const columnWidths = {
            codigo: tableWidth * columnRatios.codigo,
            descricao: tableWidth * columnRatios.descricao,
            qtdeUn: tableWidth * columnRatios.qtdeUn,
            unit: tableWidth * columnRatios.unit,
            total: tableWidth * columnRatios.total
        };
        const header = (top) => {
            let x = startX;
            this.doc.font('Arial-bold').fontSize(this.fontSize).text('Código', x, top, { width: columnWidths.codigo });
            x += columnWidths.codigo + columnSpacing;
            this.doc.text('Descrição', x, top, { width: columnWidths.descricao });
            x += columnWidths.descricao + columnSpacing;
            this.doc.text('Qtde', x, top, { width: columnWidths.qtdeUn, align: 'right' });
            x += columnWidths.qtdeUn + columnSpacing;
            this.doc.text('Unit', x, top, { width: columnWidths.unit, align: 'right' });
            x += columnWidths.unit + columnSpacing;
            this.doc.text('Total', x, top, { width: columnWidths.total, align: 'right' });
        };
        const row = (top, item) => {
            const quant = parseFloat(String(item.prod.qCom || item.prod.qTrib)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
            const valUnit = parseFloat(String(item.prod.vUnCom || item.prod.vUnTrib || '0')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const valLiq = parseFloat(String(item.prod.vProd || '0')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            let x = startX;
            this.doc.font('Arial').fontSize(this.fontSize).text(item.prod.cProd, x, top, { width: columnWidths.codigo });
            x += columnWidths.codigo + columnSpacing;
            this.doc.text(item.prod.xProd.slice(0, 24), x, top, { width: columnWidths.descricao });
            x += columnWidths.descricao + columnSpacing;
            this.doc.text(`${quant} ${item.prod.uCom}`, x, top, { width: columnWidths.qtdeUn, align: 'right' });
            x += columnWidths.qtdeUn + columnSpacing;
            this.doc.text(valUnit, x, top, { width: columnWidths.unit, align: 'right' });
            x += columnWidths.unit + columnSpacing;
            this.doc.text(valLiq, x, top, { width: columnWidths.total, align: 'right' });
        };
        header(tableTop);
        let y = tableTop + this.itemHeight;
        if (this.det instanceof Array) {
            this.det.forEach((prod) => {
                row(y, prod);
                y += this.itemHeight;
            });
        }
        else {
            row(y, this.det);
        }
    }
    _buildTotais() {
        let tableTop = this.doc.y + 5;
        const quantidadeTotalDeItens = Array.isArray(this.det) ? this.det.length : 1;
        let valTotal = 0;
        let acrescimo = 0;
        let desconto = 0;
        if (Array.isArray(this.det)) {
            // Calcula o valor total dos produtos
            valTotal = this.det.reduce((sum, item) => sum + parseFloat(item.prod.vProd), 0);
            // Calcula o total dos acréscimos
            acrescimo = this.det.reduce((sum, item) => sum + (parseFloat(item.prod.vFrete || '0') + parseFloat(item.prod.vSeg || '0') + parseFloat(item.prod.vOutro || '0')), 0);
            // Calcula o total dos descontos
            desconto = this.det.reduce((sum, item) => sum + parseFloat(item.prod.vDesc || '0'), 0);
        }
        else {
            // Calcula o valor total do produto, os acréscimos, e desconto caso não seja um array
            valTotal = parseFloat(this.det.prod.vProd);
            acrescimo = parseFloat(this.det.prod.vFrete || '0') + parseFloat(this.det.prod.vSeg || '0') + parseFloat(this.det.prod.vOutro || '0');
            desconto = parseFloat(this.det.prod.vDesc || '0');
        }
        const valorTotal = valTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        const acrescimoTotal = acrescimo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        const descontoTotal = desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        this.doc.text('Qtd. total de itens', 2, tableTop);
        this.doc.text(String(quantidadeTotalDeItens), this.calculaPosicao(String(quantidadeTotalDeItens)), tableTop, {
            align: 'right',
        });
        tableTop += this.itemHeight;
        this.doc.text('Valor total R$', 2, tableTop);
        this.doc.text(valorTotal, this.calculaPosicao(valorTotal), tableTop, {
            align: 'right',
        });
        tableTop += this.itemHeight;
        if (desconto > 0) {
            this.doc.text('Desconto R$', 2, tableTop);
            this.doc.text(descontoTotal, this.calculaPosicao(descontoTotal), tableTop, {
                align: 'right',
            });
            tableTop += this.itemHeight;
        }
        if (acrescimo > 0) {
            this.doc.text('Acréscimo R$', 2, tableTop);
            this.doc.text(acrescimoTotal, this.calculaPosicao(acrescimoTotal), tableTop, {
                align: 'right',
            });
            tableTop += this.itemHeight;
        }
        if (desconto > 0 || acrescimo > 0) {
            const totalPagar = parseFloat(String(valTotal + acrescimo - desconto)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
            this.doc.font('Arial-bold').text('Valor a Pagar R$', 2, tableTop);
            this.doc.text(totalPagar, this.calculaPosicao(totalPagar), tableTop, {
                align: 'right',
            });
        }
        tableTop += this.itemHeight + 2;
        this.doc.font('Arial').text('FORMA PAGAMENTO', 2, tableTop);
        // Tipos
        let topTiposPag = tableTop;
        if (Array.isArray(this.pag.detPag)) {
            for (let pagto of this.pag.detPag) {
                if (!pagto.xPag)
                    pagto.xPag = (0, getDesTipoPag_1.getDesTipoPag)(pagto.tPag);
                this.doc.text(pagto.xPag || 'Não informado', 2, topTiposPag + this.itemHeight);
                topTiposPag += this.itemHeight;
            }
        }
        else {
            if (!this.pag.detPag.xPag)
                this.pag.detPag.xPag = (0, getDesTipoPag_1.getDesTipoPag)(this.pag.detPag.tPag);
            this.doc.text(this.pag.detPag.xPag || 'Não informado', 2, topTiposPag + this.itemHeight);
        }
        this.doc.text('VALOR PAGO R$', this.calculaPosicao('VALOR PAGO R$'), tableTop, {
            align: 'right',
        });
        // Valores
        let topValPags = tableTop;
        if (Array.isArray(this.pag.detPag)) {
            for (let pagto of this.pag.detPag) {
                const val = parseFloat(pagto.vPag).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
                this.doc.text(val, this.calculaPosicao(val), topValPags + this.itemHeight, {
                    align: 'right',
                });
                topValPags += this.itemHeight;
            }
        }
        else {
            const val = parseFloat(this.pag.detPag.vPag).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
            this.doc.text(val, this.calculaPosicao(val), topValPags + this.itemHeight, {
                align: 'right',
            });
        }
        tableTop = topValPags;
        tableTop += 2 * this.itemHeight;
        let valTroco = 0;
        if (Array.isArray(this.pag.detPag)) {
            valTroco = this.pag.detPag.reduce((sum, item) => sum + parseFloat(item.vTroco || '0'), 0);
        }
        else {
            valTroco = parseFloat(this.pag.detPag.vTroco || '0');
        }
        const troco = valTroco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        this.doc.text('Troco R$', 2, tableTop);
        this.doc.text(troco, this.calculaPosicao(troco), tableTop, {
            align: 'right',
        });
    }
    _buildFooter(qrCodeBuffer) {
        let tableTop = this.doc.y + 5;
        this.doc.font('Arial-bold').text('Consulte pela Chave de Acesso em', 0, tableTop, {
            align: 'center'
        });
        tableTop += this.itemHeight;
        this.doc.font('Arial').text(this.infNFeSupl?.urlChave || '', 0, tableTop, {
            align: 'center'
        });
        tableTop += this.itemHeight;
        this.doc.text(this.protNFe?.infProt.chNFe || '', 0, tableTop, {
            align: 'center'
        });
        tableTop += this.itemHeight;
        // const filePath = path.resolve(baseDir, this.qrcodePath);
        // this.doc.image(`${filePath}/qrcode.png`, 2, tableTop, { width: 70.87, height: 70.87 });
        this.doc.image(qrCodeBuffer, 2, tableTop, { width: 70.87, height: 70.87 });
        tableTop += 4;
        let topBeforeQrCode = tableTop;
        const CNPJCPF = this.documento.mascaraCnpjCpf(this.dest?.CNPJCPF || this.dest?.CNPJ || this.dest?.CPF || this.dest?.idEstrangeiro || '');
        const xNome = this.dest?.xNome ?? 'Sem cliente identificado';
        const xLgr = this.dest?.enderDest?.xLgr ?? '';
        const nro = this.dest?.enderDest?.nro ?? '';
        const xBairro = this.dest?.enderDest?.xBairro ?? null;
        const xMun = this.dest?.enderDest?.xMun ?? '';
        const UF = this.dest?.enderDest?.UF ?? '';
        const enderecoPartes = [
            xLgr && `${xLgr}`,
            nro && `${nro}`,
            xBairro && `bairro: ${xBairro}`,
            xMun && `${xMun}`,
            UF && `${UF}`
        ].filter(Boolean);
        const enderecoStr = enderecoPartes.join(', ');
        if (CNPJCPF && CNPJCPF !== '') {
            this.doc.font('Arial-bold').text(`CONSUMIDOR - DOC ${CNPJCPF}`, 75, tableTop, {
                align: 'left',
                lineGap: 1,
                continued: true,
            }).font('Arial')
                .text(` - ${xNome} -`, {
                lineGap: 1,
                continued: true,
            })
                .text(enderecoStr);
            tableTop = this.doc.y + 4;
        }
        else {
            this.doc.text('CONSUMIDOR NÃO IDENTIFICADO', 75, tableTop, {
                align: 'left',
            });
            tableTop = this.doc.y + 4;
        }
        const data = (0, date_fns_1.parseISO)(this.ide.dhEmi);
        const dtaEmi = (0, date_fns_1.format)(data, 'dd/MM/yyyy HH:mm:ss');
        let dtaAut = (0, date_fns_1.format)(new Date(), 'dd/MM/yyyy HH:mm:ss');
        if (this.protNFe?.infProt.dhRecbto) {
            const dataAut = (0, date_fns_1.parseISO)(this.protNFe?.infProt.dhRecbto);
            dtaAut = (0, date_fns_1.format)(dataAut, 'dd/MM/yyyy HH:mm:ss');
        }
        this.doc.font('Arial-bold').text(`NCF-e nº ${this.ide.nNF} Série ${this.ide.serie} ${dtaEmi}`, 75, tableTop, {
            align: 'left',
            lineGap: 1,
        })
            .text('Protocolo de autorização: ', {
            continued: true,
            lineGap: 1,
        })
            .font('Arial')
            .text(this.protNFe?.infProt.nProt || '123')
            .font('Arial-bold')
            .text('Data de autorização ', {
            continued: true,
            lineGap: 1,
        })
            .font('Arial')
            .text(dtaAut);
        tableTop = this.doc.y + 20;
        topBeforeQrCode += 70.87;
        this.doc.text(`Tributos Totais Incidentes (Lei Federal 12.741/2012): R$ ${parseFloat(this.total.ICMSTot.vTotTrib || '0').toFixed(2)}`, 0, topBeforeQrCode, {
            align: 'center'
        });
    }
    async generatePDF(exibirMarcaDaguaDanfe) {
        try {
            this.exibirMarcaDaguaDanfe = exibirMarcaDaguaDanfe || true;
            // await this.saveQRCode(this.infNFeSupl?.qrCode  || '')
            const qrCodeBuffer = await this.getQRCodeBuffer(this.infNFeSupl?.qrCode || '');
            this.doc.pipe(fs_1.default.createWriteStream(this.outputPath));
            this.drawHeader(true);
            this._buildProdutos();
            this._buildTotais();
            this.drawFooter(qrCodeBuffer);
            this.doc.end();
            return {
                message: `  DANFE Gerada em '${this.outputPath}'`,
                success: true,
            };
        }
        catch (error) {
            throw new Error(`Erro ao gerar DANFE: ${error.message}`);
        }
    }
}
exports.default = NFCEGerarDanfe;
//# sourceMappingURL=NFCEGerarDanfe.js.map
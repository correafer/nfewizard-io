"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCodeURLOnline = generateQRCodeURLOnline;
exports.generateQRCodeURLOffline = generateQRCodeURLOffline;
const crypto_1 = require("crypto");
const sha1_1 = __importDefault(require("sha1"));
// Função para gerar o hash SHA-1 em formato hexadecimal
function generateSHA1Hash(input) {
    return (0, crypto_1.createHash)('sha1').update(input).digest('hex');
}
function calcularDigestValueHex(digVal) {
    return Buffer.from(digVal).toString('hex');
}
// Função para gerar a URL do QR Code para emissão ONLINE
function generateQRCodeURLOnline(chaveAcesso, versaoQRCode, tipoAmbiente, identificadorCSC, csc, utility) {
    const urlQRCodeNFCe = utility.getUrlNFCe('URL-QRCode', false, '');
    chaveAcesso = chaveAcesso.replace('NFe', '');
    // Passo 1: Concatenar parâmetros
    const baseString = `${chaveAcesso}|${versaoQRCode}|${tipoAmbiente}|${identificadorCSC}`;
    // Passo 2: Adicionar o CSC
    const stringToHash = `${baseString}${csc}`;
    // Passo 3: Gerar o hash
    const codigoHash = generateSHA1Hash(stringToHash);
    // Montar a URL final
    return `${urlQRCodeNFCe}?p=${baseString}|${codigoHash}`;
}
// Função para gerar a URL do QR Code para emissão OFFLINE
function generateQRCodeURLOffline(chaveAcesso, versaoQRCode, tipoAmbiente, diaDataEmissao, valorTotalNfce, digVal, identificadorCSC, csc, utility) {
    const urlQRCodeNFCe = utility.getUrlNFCe('URL-QRCode', false, '');
    chaveAcesso = chaveAcesso.replace('NFe', '');
    // Passo 1: Converter DigestValue para HEXA
    const digestValueHex = calcularDigestValueHex(digVal);
    // Passo 2: Concatenar parâmetros
    const baseString = `${chaveAcesso}|${versaoQRCode}|${tipoAmbiente}|${diaDataEmissao}|${valorTotalNfce}|${digestValueHex}|${identificadorCSC}`;
    // Passo 3: Adicionar o CSC
    const stringToHash = `${baseString}${csc}`;
    // Passo 4: Gerar o hash
    const hash = (0, sha1_1.default)(stringToHash).toUpperCase();
    // Montar URL
    return `${urlQRCodeNFCe}?p=${baseString}|${hash}`;
}
//# sourceMappingURL=NFCEQRCode.js.map
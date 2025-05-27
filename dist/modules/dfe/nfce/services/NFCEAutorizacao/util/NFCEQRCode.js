import { createHash } from 'crypto';
import sha1 from 'sha1';
// Função para gerar o hash SHA-1 em formato hexadecimal
function generateSHA1Hash(input) {
    return createHash('sha1').update(input).digest('hex');
}
function calcularDigestValueHex(digVal) {
    return Buffer.from(digVal).toString('hex');
}
// Função para gerar a URL do QR Code para emissão ONLINE
export function generateQRCodeURLOnline(chaveAcesso, versaoQRCode, tipoAmbiente, identificadorCSC, csc, utility) {
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
export function generateQRCodeURLOffline(chaveAcesso, versaoQRCode, tipoAmbiente, diaDataEmissao, valorTotalNfce, digVal, identificadorCSC, csc, utility) {
    const urlQRCodeNFCe = utility.getUrlNFCe('URL-QRCode', false, '');
    chaveAcesso = chaveAcesso.replace('NFe', '');
    // Passo 1: Converter DigestValue para HEXA
    const digestValueHex = calcularDigestValueHex(digVal);
    // Passo 2: Concatenar parâmetros
    const baseString = `${chaveAcesso}|${versaoQRCode}|${tipoAmbiente}|${diaDataEmissao}|${valorTotalNfce}|${digestValueHex}|${identificadorCSC}`;
    // Passo 3: Adicionar o CSC
    const stringToHash = `${baseString}${csc}`;
    // Passo 4: Gerar o hash
    const hash = sha1(stringToHash).toUpperCase();
    // Montar URL
    return `${urlQRCodeNFCe}?p=${baseString}|${hash}`;
}
//# sourceMappingURL=NFCEQRCode.js.map